import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const source = path.join(root, "public/images/m-logo.png");

const outputs = [
  { file: "src/app/icon.png", size: 64, fit: "contain" },
  { file: "src/app/apple-icon.png", size: 180, fit: "contain" },
  { file: "public/icons/icon-192.png", size: 192, fit: "contain" },
  { file: "public/icons/icon-512.png", size: 512, fit: "contain" },
];

function buildBmpEntry(size, rgba) {
  const headerSize = 40;
  const stride = size * 4;
  const pixelDataSize = stride * size;
  const maskRowBytes = Math.ceil(size / 32) * 4;
  const maskSize = maskRowBytes * size;
  const total = headerSize + pixelDataSize + maskSize;

  const buf = Buffer.alloc(total);
  buf.writeUInt32LE(headerSize, 0);
  buf.writeInt32LE(size, 4);
  buf.writeInt32LE(size * 2, 8);
  buf.writeUInt16LE(1, 12);
  buf.writeUInt16LE(32, 14);
  buf.writeUInt32LE(0, 16);
  buf.writeUInt32LE(pixelDataSize, 20);
  buf.writeInt32LE(0, 24);
  buf.writeInt32LE(0, 28);
  buf.writeUInt32LE(0, 32);
  buf.writeUInt32LE(0, 36);

  for (let y = 0; y < size; y++) {
    const srcRow = (size - 1 - y) * size * 4;
    const dstRow = headerSize + y * stride;
    for (let x = 0; x < size; x++) {
      const r = rgba[srcRow + x * 4 + 0];
      const g = rgba[srcRow + x * 4 + 1];
      const b = rgba[srcRow + x * 4 + 2];
      const a = rgba[srcRow + x * 4 + 3];
      buf[dstRow + x * 4 + 0] = b;
      buf[dstRow + x * 4 + 1] = g;
      buf[dstRow + x * 4 + 2] = r;
      buf[dstRow + x * 4 + 3] = a;
    }
  }
  return buf;
}

function packIco(entries) {
  const ICONDIR_SIZE = 6;
  const ICONDIRENTRY_SIZE = 16;
  const count = entries.length;

  const dir = Buffer.alloc(ICONDIR_SIZE + ICONDIRENTRY_SIZE * count);
  dir.writeUInt16LE(0, 0);
  dir.writeUInt16LE(1, 2);
  dir.writeUInt16LE(count, 4);

  let offset = ICONDIR_SIZE + ICONDIRENTRY_SIZE * count;
  entries.forEach(({ size, buffer }, i) => {
    const entry = ICONDIR_SIZE + ICONDIRENTRY_SIZE * i;
    const dim = size >= 256 ? 0 : size;
    dir.writeUInt8(dim, entry + 0);
    dir.writeUInt8(dim, entry + 1);
    dir.writeUInt8(0, entry + 2);
    dir.writeUInt8(0, entry + 3);
    dir.writeUInt16LE(1, entry + 4);
    dir.writeUInt16LE(32, entry + 6);
    dir.writeUInt32LE(buffer.length, entry + 8);
    dir.writeUInt32LE(offset, entry + 12);
    offset += buffer.length;
  });

  return Buffer.concat([dir, ...entries.map((b) => b.buffer)]);
}

async function run() {
  for (const out of outputs) {
    const dest = path.join(root, out.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    await sharp(source)
      .resize(out.size, out.size, {
        fit: out.fit ?? "cover",
        position: "centre",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toFile(dest);
    console.log(`wrote ${out.file} (${out.size}x${out.size})`);
  }

  const icoSizes = [16, 32, 48];
  const icoEntries = await Promise.all(
    icoSizes.map(async (size) => {
      const rgba = await sharp(source)
        .resize(size, size, {
          fit: "contain",
          position: "centre",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .ensureAlpha()
        .raw()
        .toBuffer();
      return { size, buffer: buildBmpEntry(size, rgba) };
    })
  );
  const icoPath = path.join(root, "src/app/favicon.ico");
  fs.writeFileSync(icoPath, packIco(icoEntries));
  console.log(`wrote src/app/favicon.ico (${icoSizes.join(",")})`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

# `_sample/` — Reference Project Folder

This folder is a **template**. Don't reference it from `projects.ts`.
Copy the file names below into your real project folder when you have
screenshots ready.

## Expected files

```
_sample/
├── hero.png            ← 1200×800, the featured / thumbnail photo
├── 01-overview.png     ← gallery shot #1 — high-level / landing view
├── 02-dashboard.png    ← gallery shot #2 — main interaction
├── 03-feature.png      ← gallery shot #3 — a key feature deep-dive
└── 04-mobile.png       ← gallery shot #4 — optional, mobile/responsive
```

## How this wires into `projects.ts`

For a project with `id: "<your-project-id>"`:

```ts
{
  id: "<your-project-id>",
  thumbnail: "/projects/<your-project-id>/hero.png",
  images: [
    "/projects/<your-project-id>/01-overview.png",
    "/projects/<your-project-id>/02-dashboard.png",
    "/projects/<your-project-id>/03-feature.png",
    "/projects/<your-project-id>/04-mobile.png",
  ],
}
```

## Naming tips

- Keep the **`NN-<topic>`** prefix so gallery order is obvious in the
  file browser.
- `<topic>` is free-form — pick whatever describes the shot:
  `signup-flow`, `lead-pipeline`, `dark-mode`, `chart-detail`, etc.
- For mobile-only projects (BMI Calculator, Unit Converter, etc.)
  you can stack tall portrait shots — the gallery component handles
  9:16 just fine.
- Replace `.png` with `.webp` for photo-heavy assets to cut size.

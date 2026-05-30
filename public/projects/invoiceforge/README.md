# invoiceforge — Images

Screenshots available: banner-invoiceforge.png, thumbnil-invoiceForge.png  
Status: ⚠️ Images exist but NOT wired into project-images.ts yet

---

## Action Required — Wire in existing images

```ts
invoiceforge: {
  thumbnail: "/projects/invoiceforge/thumbnil-invoiceForge.png",
  banner: "/projects/invoiceforge/banner-invoiceforge.png",
  gallery: [
    "/projects/invoiceforge/banner-invoiceforge.png",
    "/projects/invoiceforge/thumbnil-invoiceForge.png",
    // drop more screenshots here: invoice form, PDF preview, UPI QR, mobile PWA
  ],
},
```

---

## More screenshots needed for gallery

| File to drop here | What to show |
|-------------------|--------------|
| `invoice-form.png` | GST invoice creation form with line items |
| `pdf-preview.png` | Generated PDF preview |
| `upi-qr.png` | UPI QR code + payment section |
| `mobile-pwa.png` | PWA installed on Android home screen |

---

## Banner Prompt (if regenerating) — attach current banner-invoiceforge.png

```
I'm attaching a banner image for "InvoiceForge" — a GST invoice PWA for 
Indian businesses. Improve or recreate as a 1200×800px professional banner.

Canvas: 1200×800px
Style: Dark #0a0a0f, indigo + cyan glow, fintech/SaaS aesthetic

Key elements to show:
- GST invoice form with line items and ₹ amounts
- PDF export preview
- UPI QR code card
- PWA offline badge

Text: "InvoiceForge" · "GST Invoices. Offline. Instant."
Tags: "PWA · Offline-first · UPI QR · Hindi / English · Next.js 15"

Output: 1200×800px, no white border.
```

---

## Thumbnail Prompt (if regenerating) — attach thumbnil-invoiceForge.png

```
Improve or recreate the attached thumbnail for "InvoiceForge" GST invoice PWA.

Canvas: 800×500px
Style: Dark glassmorphism, indigo/cyan accents

Show: Invoice dashboard with status badges (PAID/PENDING/DRAFT), 
monthly summary card, offline sync indicator.

Text: "InvoiceForge" · "🔒 Offline Ready"
Output: 800×500px.
```

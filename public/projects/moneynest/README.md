# moneynest — Images

Screenshots available: none yet
Status: ❌ not wired | Drop screenshots here then update project-images.ts

---

## Banner Prompt (1200×800px) — generate from description

```
Create a professional portfolio banner for "moneyNest" — an Android-first, 
privacy-first, on-device-only expense tracker for Indian users. No login, 
no ads, no cloud. Voice expense entry.

Canvas: 1200×800px | Style: Dark #0a0a0f, minimal and trustworthy

Composition:
- Center: Large Android phone mockup showing:
  · Main expense list screen with ₹ amounts and categories
  · A "voice input" indicator (microphone icon, pulsing)
- Left phone: Monthly summary/chart screen (tilted left)
- Right phone: App Lock / biometric screen (tilted right)
- Small badge: "🔒 No cloud · No login · On-device only"
- Soft green/teal glow behind center phone

Text: "moneyNest" | "Privacy-first Expense Tracker · Android"
Tags: "Expo · SQLite · Voice Input · Biometric Lock · In Dev"
Mood: Calm, private finance — anti-cloud, India-focused.

Output: 1200×800px, no white border.
```

---

## Thumbnail Prompt (800×500px)

```
Create a thumbnail for "moneyNest" privacy-first expense tracker.

Canvas: 800×500px | Style: Dark, soft green glow

Composition:
- Two phone mockups: expense list screen + monthly chart screen
- Privacy badge: "🔒 On-device only · No cloud"
- Top: "moneyNest" wordmark
- Strip: "Expo · Voice Input · In Dev"

Output: 800×500px.
```

---

## Wire-in (after dropping files)
```ts
moneynest: {
  thumbnail: "/projects/moneynest/thumbnail.png",
  banner: "/projects/moneynest/banner.png",
  gallery: [],
},
```

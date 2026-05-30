# calc-master — Images

Screenshots available: banner.png, web-1→13-desktop, dark_web-1→4, mobile1, mobile2
Status: ✅ wired into project-images.ts | banner.png already generated

---

## Banner already exists: banner.png ✅ — skip unless regenerating

## Banner Prompt (if regenerating, 1200×800px) — attach web-1-desktop, dark_web-1, mobile1

```
I'm attaching real screenshots of "CalcMaster" — a multi-calculator 
Expo/React Native mobile app with i18n and dark/light themes.
Use these EXACT screenshots only.

Canvas: 1200×800px | Background: Dark #0a0a0f

Composition:
- Center: Large phone mockup showing mobile1 or web-1-desktop (main screen).
- Left: Phone showing dark_web-1 (dark theme), tilted left.
- Right: Phone showing mobile2, tilted right.
- Soft indigo/cyan glow behind center phone.

Text: "CalcMaster" | "Multi-Calculator · React Native · i18n"
Tags: "Expo · NativeWind · Haptics · Localized · Live"
Use ONLY provided screenshots. Output: 1200×800px.
```

---

## Thumbnail Prompt (800×500px) — attach web-1-desktop, dark_web-1

```
Canvas: 800×500px | Background: Dark, indigo glow
- Two phone mockups: web-1-desktop (light) and dark_web-1 (dark) — shows both themes.
- Top: "CalcMaster" wordmark | Strip: "Multi-Calculator · Expo · Live"
Use ONLY provided screenshots. Output: 800×500px.
```

---

## Wire-in (project-images.ts)
```ts
"calc-master": {
  thumbnail: "/projects/calc-master/web-1-desktop.png",
  banner: "/projects/calc-master/banner.png",
  gallery: [
    "/projects/calc-master/web-1-desktop.png",
    "/projects/calc-master/dark_web-1.png",
    "/projects/calc-master/mobile1.png",
    "/projects/calc-master/web-2-desktop.png",
    "/projects/calc-master/web-3-desktop.png",
  ],
},
```

# bmi-calculator — Images

Screenshots available: mobile-1-bmiCalculator.jpg → mobile-4-bmiCalculator.jpg
Status: ✅ wired into project-images.ts

---

## Banner Prompt (1200×800px) — attach mobile-1, mobile-2, mobile-3-bmiCalculator

```
I'm attaching real screenshots of "BMI Calculator" — a React Native Expo mobile 
app with history charts, share feature, and linear-gradient UI.
Use these EXACT screenshots only.

Canvas: 1200×800px | Background: Dark #0a0a0f, health/fitness feel

Composition:
- Center: Large phone mockup showing mobile-1-bmiCalculator (main result screen).
- Left: Smaller phone showing mobile-2-bmiCalculator (history chart), tilted left.
- Right: Smaller phone showing mobile-3-bmiCalculator, tilted right.
- Soft green/teal radial glow behind center phone. Clean white phone frames.

Text: "BMI Calculator" | "React Native · Expo · Charts · Share"
Tags: "History Charts · Linear Gradient · Haptics · Share Card · Live"
Mood: Clean health app — like MyFitnessPal cards.
Use ONLY provided screenshots. Output: 1200×800px, no white border.
```

---

## Thumbnail Prompt (800×500px) — attach mobile-1, mobile-2-bmiCalculator

```
Canvas: 800×500px | Background: Dark, green/teal glow
- Center: Two phone mockups side by side — mobile-1 and mobile-2.
- Top: "BMI Calculator" wordmark
- Strip: "Expo · React Native · Live"
Use ONLY provided screenshots. Output: 800×500px.
```

---

## Wire-in (project-images.ts)
```ts
"bmi-calculator": {
  thumbnail: "/projects/bmi-calculator/mobile-1-bmiCalculator.jpg",
  banner: "/projects/bmi-calculator/mobile-1-bmiCalculator.jpg",
  gallery: [
    "/projects/bmi-calculator/mobile-1-bmiCalculator.jpg",
    "/projects/bmi-calculator/mobile-2-bmiCalculator.jpg",
    "/projects/bmi-calculator/mobile-3-bmiCalculator.jpg",
    "/projects/bmi-calculator/mobile-4-bmiCalculator.jpg",
  ],
},
```

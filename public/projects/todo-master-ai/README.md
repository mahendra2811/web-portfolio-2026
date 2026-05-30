# todo-master-ai — Images

Screenshots available: web-1-todoMasterAI.png → web-7-todoMasterAI.png
Status: ✅ wired into project-images.ts

---

## Banner Prompt (1200×800px) — attach web-1, web-2, web-3-todoMasterAI

```
I'm attaching real screenshots of "TodoMaster AI" — a drag-and-drop todo 
app with Supabase auth and cloud sync. Use these EXACT screenshots only.

Canvas: 1200×800px | Background: Dark #0a0a0f

Composition:
- Main (center-left): web-1-todoMasterAI in a browser/laptop frame. Large.
- Right: Two smaller floating panels (web-2, web-3) at slight angles, 
  glass-border drop shadow.
- Soft indigo radial glow behind laptop.

Text (top-left): "TodoMaster AI" | "Drag-and-drop Todo · Supabase · Cloud Sync"
Tags: "Next.js 16 · @dnd-kit · Zustand · Supabase · Live"
Mood: Clean productivity SaaS — think Linear or Todoist.
Use ONLY provided screenshots. Output: 1200×800px, no white border.
```

---

## Thumbnail Prompt (800×500px) — attach web-1, web-4-todoMasterAI

```
Canvas: 800×500px | Background: Dark, indigo glow
- Left 65%: Crop todo list from web-1-todoMasterAI in browser frame.
- Right 35%: Panel from web-4, angled 8°, glass border.
- Strip: "TodoMaster AI · Live · Next.js + Supabase"
Use ONLY provided screenshots. Output: 800×500px.
```

---

## Wire-in (project-images.ts)
```ts
"todo-master-ai": {
  thumbnail: "/projects/todo-master-ai/web-1-todoMasterAI.png",
  banner: "/projects/todo-master-ai/web-1-todoMasterAI.png",
  gallery: [
    "/projects/todo-master-ai/web-1-todoMasterAI.png",
    "/projects/todo-master-ai/web-2-todoMasterAI.png",
    "/projects/todo-master-ai/web-3-todoMasterAI.png",
    "/projects/todo-master-ai/web-4-todoMasterAI.png",
    "/projects/todo-master-ai/web-5-todoMasterAI.png",
    "/projects/todo-master-ai/web-6-todoMasterAI.png",
    "/projects/todo-master-ai/web-7-todoMasterAI.png",
  ],
},
```

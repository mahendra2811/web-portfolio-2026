# todo-master-ai — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "todo-master-ai"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | 1200×800 | Main todo board / task list |
| `01-overview.png` | 1200×800 | Todo list with drag handles visible |
| `02-dashboard.png` | 1200×800 | Supabase auth — login or signup screen |
| `03-feature.png` | 1200×800 | Due date picker or Sonner toast notification |
| `04-mobile.png` | portrait ok | App on mobile screen |

## How to wire in

```ts
thumbnail: "/projects/todo-master-ai/hero.png",
images: [
  "/projects/todo-master-ai/01-overview.png",
  "/projects/todo-master-ai/02-dashboard.png",
  "/projects/todo-master-ai/03-feature.png",
  "/projects/todo-master-ai/04-mobile.png",
],
```

## Tips
- Show the drag-and-drop in mid-drag (hover state) for the feature shot.
- Dark UI screenshot at 1440px looks cleanest for this app.

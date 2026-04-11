export const post = {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } },
    { name: "excerpt", title: "Excerpt", type: "text", rows: 3 },
    { name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image" },
        { type: "code" },
        {
          type: "object",
          name: "table",
          title: "Table",
          fields: [
            { name: "headers", title: "Headers", type: "array", of: [{ type: "string" }] },
            { name: "alignments", title: "Alignments", type: "array", of: [{ type: "string" }] },
            { name: "rows", title: "Rows", type: "array", of: [{ type: "array", of: [{ type: "string" }] }] },
          ],
        },
        {
          type: "object",
          name: "divider",
          title: "Divider",
          fields: [
            { name: "style", title: "Style", type: "string" },
          ],
        },
        {
          type: "object",
          name: "callout",
          title: "Callout",
          fields: [
            { name: "calloutType", title: "Type", type: "string" },
            { name: "text", title: "Text", type: "text" },
          ],
        },
        {
          type: "object",
          name: "collapsible",
          title: "Collapsible Section",
          fields: [
            { name: "summary", title: "Summary", type: "string" },
            { name: "content", title: "Content", type: "array", of: [{ type: "block" }, { type: "code" }] },
          ],
        },
        {
          type: "object",
          name: "highlight",
          title: "Highlight Box",
          fields: [
            { name: "text", title: "Text", type: "text" },
          ],
        },
      ],
    },
    { name: "categories", title: "Categories", type: "array", of: [{ type: "reference", to: [{ type: "category" }] }] },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    { name: "readingTime", title: "Reading Time (minutes)", type: "number" },
  ],
};

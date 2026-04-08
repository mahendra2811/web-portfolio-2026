import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "mahendra-portfolio-blog",
  title: "Mahendra Portfolio Blog",
  projectId: "9lxe9yiz",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool(), codeInput()],
  schema: { types: schemaTypes },
});

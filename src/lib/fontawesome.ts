import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Prevent FontAwesome from auto-adding CSS (Next.js handles it via the import above)
config.autoAddCss = false;

// Icons are imported directly in each component — no global library.add() needed.
// This enables proper tree-shaking: only icons actually used on a page are bundled.

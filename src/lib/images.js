// Shared helper to resolve images that live under src/assets/images from
// data-driven references (JSON data, dynamically built lists, etc.).
//
// Astro's asset pipeline requires a static `import` (or a glob) to know
// about an image at build time — a plain string path built at runtime
// can't be resolved. `import.meta.glob` here eagerly imports every image
// under src/assets/images so callers can look one up by its relative path
// (e.g. "blog/posts/1.png" or "/assets/images/blog/posts/1.png") and then
// run it through `getImage()`.
export const imageModules = import.meta.glob(
  "/src/assets/images/**/*.{png,jpg,jpeg,webp,gif,PNG,JPG,JPEG,WEBP,GIF}",
  { eager: true }
);

/**
 * Resolve a relative (or "/assets/images/..."-prefixed) image path to its
 * imported ImageMetadata module, ready to be passed to astro:assets'
 * `getImage()` / `<Image />`.
 *
 * Returns `null` when no matching asset is found.
 */
export function getImageModule(relativePath) {
  if (!relativePath) return null;

  const cleaned = String(relativePath)
    .replace(/^\/?assets\/images\//, "")
    .replace(/^\/+/, "");

  const key = `/src/assets/images/${cleaned}`;
  const mod = imageModules[key];
  return mod ? mod.default : null;
}

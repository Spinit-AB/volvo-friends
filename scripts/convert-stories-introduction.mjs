import { getCliClient } from "sanity/cli";
import { randomUUID } from "node:crypto";

// pnpm exec sanity exec scripts/convert-stories-introduction.mjs --with-user-token -- [--apply]
// Converts existing plain introductions to Portable Text, preserving paragraph breaks.
const apply = process.argv.includes("--apply");
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
if (apply && dataset !== "dev") throw new Error("This conversion may only write to the dev dataset.");
const client = getCliClient({ apiVersion: "2025-12-15" }).withConfig({ dataset, perspective: "raw", useCdn: false });
const pages = await client.fetch('*[_type == "storiesPage"]{_id, _rev, introduction}');
const converted = pages.filter((page) => typeof page.introduction === "string").map((page) => ({
  ...page,
  blocks: page.introduction.split(/\r?\n\s*\r?\n/).map((text) => ({
    _type: "block", _key: randomUUID(), style: "normal", markDefs: [],
    children: [{ _type: "span", _key: randomUUID(), text, marks: [] }],
  })),
}));
console.log(JSON.stringify({ dataset, apply, documents: converted.length }));
if (apply && converted.length) {
  let transaction = client.transaction();
  for (const page of converted) {
    transaction = transaction.patch(page._id, (patch) => patch.ifRevisionId(page._rev).set({ introduction: page.blocks }));
  }
  await transaction.commit();
  console.log("Converted development introductions; text retained in paragraphs.");
}

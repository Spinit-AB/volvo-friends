import { createClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";
import { convertStoryContent } from "../src/utils/convertStoryContent.ts";

// node --env-file=.env.local scripts/convert-story-content.mjs [--apply]
// Or: pnpm exec sanity exec scripts/convert-story-content.mjs --with-user-token -- --cli --apply
// Retains the original content field. Existing contentBlocks are never overwritten.
const apply = process.argv.includes("--apply");
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
if (apply && dataset !== "dev") throw new Error("This trial conversion may only write to the dev dataset.");
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset,
  apiVersion: "2025-12-15",
  useCdn: false,
  perspective: "raw",
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_READ_TOKEN,
};
const client = process.argv.includes("--cli")
  ? getCliClient({ apiVersion: config.apiVersion }).withConfig({ dataset, perspective: "raw", useCdn: false })
  : createClient(config);
const stories = await client.fetch('*[_type == "story" && !defined(contentBlocks) && count(content) > 0]{_id, _rev, content}');
// Validate every conversion before writing any document.
const converted = stories.map((story) => ({ ...story, blocks: convertStoryContent(story.content) }));
console.log(JSON.stringify({ dataset, apply, stories: converted.length,
  blocks: converted.reduce((sum, story) => sum + story.blocks.length, 0) }));
if (apply && converted.length) {
  let transaction = client.transaction();
  for (const story of converted) {
    transaction = transaction.patch(story._id, (patch) => patch.ifRevisionId(story._rev)
      .setIfMissing({ contentBlocks: story.blocks }));
  }
  await transaction.commit();
  console.log("Converted development stories; original content retained.");
}

import assert from "node:assert/strict";
import { test } from "node:test";
import { convertStoryContent } from "../src/utils/convertStoryContent.ts";
import { youtubeVideoId } from "../src/utils/youtube.ts";

test("YouTube accepts shared, watch, short, live and embed links", () => {
  const id = "M7lc1UVf-VE";
  for (const url of [
    `https://youtu.be/${id}?si=example`,
    `https://www.youtube.com/watch?v=${id}&t=30s`,
    `https://m.youtube.com/watch?v=${id}`,
    `https://www.youtube.com/shorts/${id}`,
    `https://www.youtube.com/live/${id}`,
    `https://www.youtube-nocookie.com/embed/${id}`,
  ]) assert.equal(youtubeVideoId(url), id);
});

test("YouTube rejects arbitrary hosts, playlists, invalid IDs and credentials", () => {
  for (const url of [
    "https://youtube.com.evil.example/watch?v=M7lc1UVf-VE",
    "https://evil.example/embed/M7lc1UVf-VE",
    "javascript:alert(1)", "not a URL",
    "https://www.youtube.com/playlist?list=example",
    "https://www.youtube.com/watch?v=invalid",
    "https://evil@example.com/watch?v=M7lc1UVf-VE",
    "https://www.youtube.com:8080/watch?v=M7lc1UVf-VE",
  ]) assert.equal(youtubeVideoId(url), null);
});

test("conversion preserves lists, links, images and their order without modifying the source", () => {
  const image = { _type: "customImage", _key: "photo", asset: { _ref: "image-example-800x600-jpg" }, alt: "A vehicle", crop: { top: 0.1 } };
  const paragraph = { _type: "block", _key: "text", children: [{ _type: "span", _key: "span", text: "A story", marks: ["link"] }], markDefs: [{ _key: "link", _type: "link", href: "https://example.com" }] };
  const list = { ...paragraph, _key: "list", listItem: "bullet", level: 1 };
  const source = [image, paragraph, list, { ...image, _key: "last" }];
  const before = structuredClone(source);
  const result = convertStoryContent(source);
  assert.deepEqual(result.map((block) => block._type), ["storyImage", "storyText", "storyImage"]);
  assert.deepEqual(result[1].text, [paragraph, list]);
  assert.deepEqual(result[0].image.asset, image.asset);
  assert.deepEqual(result[0].image.crop, image.crop);
  assert.equal(result[0].image.alt, image.alt);
  assert.deepEqual(source, before);
  assert.equal(new Set(result.map((block) => block._key)).size, result.length);
});

test("conversion supports text-only, image-only and empty content and refuses unknown blocks", () => {
  assert.deepEqual(convertStoryContent([]), []);
  assert.equal(convertStoryContent([{ _type: "block", _key: "a", children: [] }])[0]._type, "storyText");
  assert.equal(convertStoryContent([{ _type: "customImage", _key: "a" }])[0]._type, "storyImage");
  assert.throws(() => convertStoryContent([{ _type: "unknown" }]), /Unsupported legacy/);
});

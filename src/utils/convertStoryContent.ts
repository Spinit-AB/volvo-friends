import type { TypedObject } from "sanity";

/** Preserve paragraph/list runs, marks, image data and their order. */
export function convertStoryContent(content: TypedObject[]) {
  const result: TypedObject[] = [];
  let text: TypedObject[] = [];
  const flush = () => {
    if (!text.length) return;
    result.push({ _type: "storyText", _key: `text-${text[0]._key || result.length}`, text });
    text = [];
  };
  for (const block of content) {
    if (block._type === "block") text.push(block);
    else if (block._type === "customImage") {
      flush();
      const { _key, ...image } = block;
      result.push({ _type: "storyImage", _key: `image-${_key || result.length}`, image });
    } else {
      throw new Error(`Unsupported legacy story block: ${block._type}`);
    }
  }
  flush();
  return result;
}

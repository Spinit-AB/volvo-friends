export const webImageOptions = {
  hotspot: true,
  accept: "image/jpeg,image/png,image/webp,image/avif,image/gif",
};

export function validateWebImage(value: unknown) {
  const image = value as { asset?: { _ref?: string } } | undefined;
  const assetId = image?.asset?._ref;
  if (!assetId) return true;
  // Check existing library selections as well as new uploads.
  return /^image-.+-\d+x\d+-(jpg|jpeg|png|webp|avif|gif)$/.test(assetId)
    || "Välj en bild i JPEG-, PNG-, WebP-, AVIF- eller GIF-format.";
}

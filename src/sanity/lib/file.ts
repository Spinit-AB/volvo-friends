import { dataset, projectId } from "../env";

export function fileUrlFromAsset(asset: { _ref: string }): string | null {
  if (!asset?._ref) return null;
  // Sanity file asset _ref format: file-<id>-<ext>
  // Example: file-abc123-pdf
  const match = asset._ref.match(/^file-([^-]+)-(.+)$/);
  if (!match) return null;
  const id = match[1];
  const ext = match[2];
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`;
}

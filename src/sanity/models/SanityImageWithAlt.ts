import { type SanityImageSource } from "@sanity/image-url";

export type TSanityImageWithAlt = SanityImageSource & { alt: string };

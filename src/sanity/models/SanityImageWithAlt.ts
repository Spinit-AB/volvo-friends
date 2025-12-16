import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type TSanityImageWithAlt = SanityImageSource & { alt: string };

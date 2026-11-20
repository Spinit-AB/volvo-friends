import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { TSanityImageWithAlt } from "@/sanity/models/SanityImageWithAlt";

export function StoryImage({ image }: {
  image?: TSanityImageWithAlt;
}) {
  return (
    <div>
      {image && typeof image === "object" && "asset" in image && image.asset ? (
        <Image src={urlFor(image).width(720).height(450).fit("crop").auto("format").url()}
          alt={image.alt || ""} width={720} height={450} />
      ) : (
        <span aria-hidden="true">Volvo Friends</span>
      )}
    </div>
  );
}

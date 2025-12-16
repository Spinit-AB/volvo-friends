import { urlFor } from "@/sanity/lib/image";
import { TSanityImageWithAlt } from "@/sanity/models/SanityImageWithAlt";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { TypedObject } from "sanity";

const components = {
  types: {
    customImage: ({ value }: { value: TSanityImageWithAlt }) => (
      <Image
        src={urlFor(value).width(800).url()}
        alt={value.alt}
        width={800}
        height={400}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
    ),
  },
};

export function PortableTextWrapper({ value }: { value: TypedObject[] }) {
  return <PortableText value={value} components={components} />;
}

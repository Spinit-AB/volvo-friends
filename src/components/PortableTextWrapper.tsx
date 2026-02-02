import { urlFor } from "@/sanity/lib/image";
import { TSanityImageWithAlt } from "@/sanity/models/SanityImageWithAlt";
import { PortableText, PortableTextMarkComponentProps } from "next-sanity";
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
  marks: {
    link: ({
      children,
      value,
    }: PortableTextMarkComponentProps<TypedObject>) => {
      // Type guard for value with href
      const href =
        typeof value === "object" &&
        value &&
        "href" in value &&
        typeof (value as { href?: unknown }).href === "string"
          ? (value as unknown as { href: string }).href
          : "#";

      // Already-prefixed email or phone
      if (href.startsWith("mailto:")) {
        return <a href={href}>{children}</a>;
      }
      if (href.startsWith("tel:")) {
        return <a href={href}>{children}</a>;
      }

      // Email detection (not already mailto:)
      const isEmail = href.includes("@") && !href.startsWith("mailto:");

      // Phone detection: only digits, whitespace, and at most one dash (not already tel:)
      const phonePattern = /^\s*\d+[\d\s-]*\d\s*$/;
      const dashCount = (href.match(/-/g) || []).length;
      const isPhone = !isEmail && phonePattern.test(href) && dashCount <= 1;

      if (isEmail) {
        return <a href={`mailto:${href}`}>{children}</a>;
      }

      if (isPhone) {
        // Remove whitespace for tel: links
        return <a href={`tel:${href.replace(/\s+/g, "")}`}>{children}</a>;
      }

      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  },
};

export function PortableTextWrapper({ value }: { value: TypedObject[] }) {
  return <PortableText value={value} components={components} />;
}

const adressComponents = {
  marks: {
    ...components.marks,
  },
  types: {
    ...components.types,
  },
  block: (props: { children?: React.ReactNode }) => (
    <span>
      {props.children}
      <br />
    </span>
  ),
};

export function PortableAddressWrapper({ value }: { value: TypedObject[] }) {
  return <PortableText value={value} components={adressComponents} />;
}

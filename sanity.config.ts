"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import {
  defineConfig,
  isKeyedObject,
  defineLocaleResourceBundle,
} from "sanity";
import { structureTool } from "sanity/structure";
import { documentInternationalization } from "@sanity/document-internationalization";
import { languageFilter } from "@sanity/language-filter";
import { svSELocale } from "@sanity/locale-sv-se";
import { presentationTool } from "sanity/presentation";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";

import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { i18n } from "./languages";

const myCustomOverrides = defineLocaleResourceBundle({
  // make sure the `locale` language code corresponds to the one you want to override
  locale: "sv-SE",
  namespace: "structure",
  resources: {
    "document-inspector.menu-item.title": "Volvo Friends",
    "document-inspector.dialog.title": "Volvo Friends <DocumentTitle/>",
  },
});

export default defineConfig({
  locales: [
    {
      name: "sv-SE",
      title: "Svenska",
    },
    {
      name: "en",
      title: "English",
    },
  ],
  defaultLocale: "sv-SE",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schema.types,
    templates: (prev) => {
      const prevFiltered = prev.filter((template) => template.id !== "post");

      return [
        ...prevFiltered,
        {
          id: "post",
          title: "Aktuellt",
          schemaType: "post",
          parameters: [{ name: "language", type: "string" }],
          value: (params: { language: string }) => ({
            language: params.language,
          }),
        },
      ];
    },
  },
  plugins: [
    svSELocale(),
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    documentInternationalization({
      supportedLanguages: i18n.languages,
      schemaTypes: ["post"],
      languageField: "language",
    }),
    languageFilter({
      supportedLanguages: i18n.languages,
      documentTypes: ["post"],
      filterField: (enclosingType, member, selectedLanguageIds) => {
        // Filter internationalized arrays
        if (
          enclosingType.jsonType === "object" &&
          enclosingType.name.startsWith("internationalizedArray") &&
          "kind" in member
        ) {
          const language = isKeyedObject(member.field.path[1])
            ? member.field.path[1]._key
            : null;

          return language ? selectedLanguageIds.includes(language) : false;
        }

        // Filter internationalized objects
        // `localeString` must be registered as a custom schema type
        if (
          enclosingType.jsonType === "object" &&
          enclosingType.name.startsWith("locale")
        ) {
          return selectedLanguageIds.includes(member.name);
        }

        return true;
      },
    }),
    presentationTool({
      previewUrl: {
        initial:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://volvofriends.netlify.app", //TODO update this once we have the proper domain
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
      allowOrigins: ["http://localhost:*", "https://volvofriends.netlify.app"],
    }),
  ],
  i18n: {
    bundles: [myCustomOverrides],
  },
});

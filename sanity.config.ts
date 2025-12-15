"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig, isKeyedObject } from "sanity";
import { structureTool } from "sanity/structure";
import { documentInternationalization } from "@sanity/document-internationalization";
import { languageFilter } from "@sanity/language-filter";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";

import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { i18n } from "./languages";

export default defineConfig({
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
  ],
});

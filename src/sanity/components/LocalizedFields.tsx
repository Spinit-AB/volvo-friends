import React from "react";
import { set, unset, PatchEvent } from "sanity";
import { Stack, Text, TextInput, Card, Box } from "@sanity/ui";
import { useFormValue } from "sanity";

const LANGUAGES = [
  { title: "Swedish", value: "sv" },
  { title: "English", value: "en" },
];

/**
 * Custom input component for localized fields in Sanity v3+
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LocalizedFields(props: any) {
  const { value = {}, onChange, elementProps, schemaType } = props;
  // Get selected languages for this document
  const selectedLanguages = useFormValue(["availableLanguages"]) || [];

  if (!Array.isArray(selectedLanguages) || selectedLanguages.length === 0) {
    return <Text size={1}>Select at least one language to add fields.</Text>;
  }

  return (
    <Stack space={3}>
      {selectedLanguages.map((lang: string) => {
        const langMeta = LANGUAGES.find((l) => l.value === lang);
        return (
          <Box key={lang}>
            <Text size={1} weight="semibold">
              {langMeta ? langMeta.title : lang}
            </Text>
            <TextInput
              {...elementProps}
              value={value?.[lang] || ""}
              placeholder={`Enter value for ${
                langMeta ? langMeta.title : lang
              }`}
              onChange={(e) => {
                const val = e.currentTarget.value;
                const patch = val ? set({ ...value, [lang]: val }) : unset();
                onChange(PatchEvent.from(patch));
              }}
            />
          </Box>
        );
      })}
    </Stack>
  );
}

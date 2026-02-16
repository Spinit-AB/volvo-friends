"use client";
import { TTranslate } from "@/locales/utils/useT";
import { ChangeEvent, useEffect, useState } from "react";
import { Select } from "../forms/Select";

function getCookieValue(name: string, defaultValue: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift() || defaultValue;
    return ["system", "light", "dark"].includes(cookieValue)
      ? cookieValue
      : defaultValue;
  }
  return defaultValue;
}

export const Lightmode = ({
  t,
  selectClassName,
  wrapperClassName,
}: {
  t: TTranslate;
  selectClassName?: string;
  wrapperClassName?: string;
}) => {
  const modeOptions = [
    { value: "system", label: t("lightmode.native") },
    { value: "light", label: t("lightmode.light") },
    { value: "dark", label: t("lightmode.dark") },
  ];

  const [selected, setSelected] = useState("system");

  useEffect(() => {
    // We intentionally call setState here to sync the initial value with the cookie,
    // since document.cookie is only available in the browser. This is safe because
    // it only runs on mount and avoids SSR issues. The warning is suppressed intentionally.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelected(getCookieValue("lightmode", "system"));
  }, []);

  const applyMode = (mode: string) => {
    const root = document.documentElement;
    root.classList.remove(
      "lightmode-light",
      "lightmode-dark",
      "lightmode-native",
    );
    switch (mode) {
      case "dark":
        root.classList.add("lightmode-dark");
        break;
      case "light":
        root.classList.add("lightmode-light");
        break;
      case "system":
      default:
        root.classList.add("lightmode-native");
        break;
    }
  };

  // Apply the mode on mount and whenever selected changes
  useEffect(() => {
    applyMode(selected);
  }, [selected]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value =
      modeOptions.find((opt) => opt.label === event.currentTarget.value)
        ?.value || "system";
    setSelected(value);
    document.cookie = `lightmode=${value}; path=/; SameSite=Lax`;
  };

  return (
    <div>
      <Select
        wrapperClassName={wrapperClassName}
        className={selectClassName}
        label={`${t("lightmode.component")}:`}
        options={modeOptions.map((opt) => opt.label)}
        value={modeOptions.find((opt) => opt.value === selected)?.label}
        onChange={handleChange}
      />
    </div>
  );
};

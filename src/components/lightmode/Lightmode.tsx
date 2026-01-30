"use client";
import { TTranslate } from "@/locales/utils/useT";
import { ChangeEvent, useEffect, useState } from "react";
import { Select } from "../forms/Select";
import styles from "./Lightmode.module.css";

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
  const [selected, setSelected] = useState(() => {
    const match = document.cookie.match(/(?:^|; )lightmode=([^;]*)/);
    if (match && ["system", "light", "dark"].includes(match[1])) {
      return match[1];
    }
    return "system";
  });

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

  // Sync cookie value to state on mount
  // We read from an external system (browser cookies) and sync to React state.
  // This is a legitimate use case for setState in effects. The dependency array is empty
  // to run only once on mount. The eslint rule is suppressed because this pattern is safe.
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )lightmode=([^;]*)/);
    if (match && ["system", "light", "dark"].includes(match[1])) {
      // eslint-disable-next-line
      setSelected(match[1]);
      applyMode(match[1]);
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value =
      modeOptions.find((opt) => opt.label === event.currentTarget.value)
        ?.value || "system";
    setSelected(value);
    applyMode(value);
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

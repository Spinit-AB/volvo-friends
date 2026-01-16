import React from "react";
import styles from "./Form.module.css";
import { TColor } from "@/utils/types";

export type FormElementWrapperBaseProps = {
  label: string;
  color?: TColor;
  forcePalette?: "light" | "dark";
  helpText?: string;
  validationError?: string;
  className?: string;
};

export type FormElementWrapperProps = FormElementWrapperBaseProps & {
  id: string;
  required?: boolean;
  children: React.ReactNode;
};

export function FormElementWrapper({
  label,
  id,
  color,
  forcePalette,
  helpText,
  validationError,
  required,
  className = "",
  children,
}: FormElementWrapperProps) {
  return (
    <div
      className={[
        styles.elementWrapper,
        styles[color ?? "green"],
        forcePalette ? styles[forcePalette] : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <label htmlFor={id} className="text-base-bold">
        {label}
        {required ? <span className={styles.required}>*</span> : null}
      </label>
      {children}
      {validationError || helpText ? (
        <p
          className={`text-sm-italic ${
            validationError ? styles.validationError : ""
          }
        ${styles.helpText}
        `}
        >
          {validationError ?? helpText}
        </p>
      ) : null}
    </div>
  );
}

import React, { useId } from "react";
import styles from "./Form.module.css";
import {
  FormElementWrapper,
  FormElementWrapperBaseProps,
} from "./FormElementWrapper";
import { TColor } from "@/utils/types";

export type SelectProps = FormElementWrapperBaseProps & {
  color?: TColor;
  forcePalette?: "light" | "dark";
  label: string;
  helpText?: string;
  validationError?: string;
  options: string[] | Array<Record<string, unknown>>;
  labelKey?: keyof Record<string, unknown>;
  valueKey?: keyof Record<string, unknown>;
  wrapperClassName?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className = "",
      wrapperClassName,
      label,
      color,
      forcePalette,
      helpText,
      validationError,
      id,
      options,
      labelKey,
      valueKey,
      ...props
    },
    ref,
  ) => {
    const genId = useId();

    const renderOptions = () => {
      if (typeof options[0] === "string") {
        return (options as string[]).map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ));
      }

      return (options as Array<Record<string, unknown>>).map((opt) => (
        <option
          key={String(opt[valueKey as string])}
          value={String(opt[valueKey as string])}
        >
          {String(opt[labelKey as string])}
        </option>
      ));
    };

    return (
      <FormElementWrapper
        label={label}
        id={id ?? genId}
        color={color}
        forcePalette={forcePalette}
        helpText={helpText}
        validationError={validationError}
        className={wrapperClassName}
        required={props.required}
      >
        <select
          ref={ref}
          className={`${styles.select} ${className}`}
          id={id ?? genId}
          {...props}
        >
          {renderOptions()}
        </select>
      </FormElementWrapper>
    );
  },
);

Select.displayName = "Select";

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
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className = "",
      label,
      color,
      forcePalette,
      helpText,
      validationError,
      id,
      children,
      ...props
    },
    ref
  ) => {
    const genId = useId();
    return (
      <FormElementWrapper
        label={label}
        id={id ?? genId}
        color={color}
        forcePalette={forcePalette}
        helpText={helpText}
        validationError={validationError}
        className={className}
        required={props.required}
      >
        <select
          ref={ref}
          className={`${styles.select} ${className}`}
          id={id ?? genId}
          {...props}
        >
          {children}
        </select>
      </FormElementWrapper>
    );
  }
);

Select.displayName = "Select";

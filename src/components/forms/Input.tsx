import React, { useId } from "react";
import styles from "./Form.module.css";
import {
  FormElementWrapper,
  FormElementWrapperBaseProps,
} from "./FormElementWrapper";

export type InputProps = FormElementWrapperBaseProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      color,
      forcePalette,
      helpText,
      validationError,
      id,
      ...props
    },
    ref
  ) => {
    const genId = useId();
    const inputId = id ?? genId;
    return (
      <FormElementWrapper
        label={label}
        id={inputId}
        color={color}
        forcePalette={forcePalette}
        helpText={helpText}
        validationError={validationError}
        className={className}
        required={props.required}
      >
        <input
          ref={ref}
          className={`${styles.input} ${className}`}
          id={inputId}
          {...props}
        />
      </FormElementWrapper>
    );
  }
);

Input.displayName = "Input";

import React, { useId } from "react";
import styles from "./Form.module.css";
import {
  FormElementWrapper,
  FormElementWrapperBaseProps,
} from "./FormElementWrapper";

export type TextareaProps = FormElementWrapperBaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
    const textareaId = id ?? genId;
    return (
      <FormElementWrapper
        label={label}
        id={textareaId}
        color={color}
        forcePalette={forcePalette}
        helpText={helpText}
        validationError={validationError}
        className={className}
        required={props.required}
      >
        <textarea
          ref={ref}
          className={`${styles.textarea} ${className}`}
          id={textareaId}
          {...props}
        />
      </FormElementWrapper>
    );
  }
);

Textarea.displayName = "Textarea";

import React from "react";

export interface ClockProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
  role?: string;
  color?: string;
}

const Clock: React.FC<ClockProps> = ({
  width = 128,
  height = 128,
  className,
  style,
  title,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
  role = "img",
  color,
  ...rest
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role={role}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      color={color}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M64 119C94.3757 119 119 94.3757 119 64C119 33.6243 94.3757 9 64 9C33.6243 9 9 33.6243 9 64C9 94.3757 33.6243 119 64 119Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64 29V64"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64 64H39"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Clock;

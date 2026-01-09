export const Grill = ({
  width = 235,
  height = 40,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_344_210)">
        <path
          d="M6.88916 4.95801C6.88916 3.85344 5.99373 2.95801 4.88916 2.95801C3.78459 2.95801 2.88916 3.85344 2.88916 4.95801V16.958C2.88916 18.0626 3.78459 18.958 4.88916 18.958C5.99373 18.958 6.88916 18.0626 6.88916 16.958V4.95801Z"
          fill="currentColor"
        />
        <path
          d="M5.5 12.938L35.3858 15.5527C36.4862 15.6489 37.4563 14.8349 37.5525 13.7346C37.6488 12.6342 36.8348 11.6642 35.7345 11.5679L5.84862 8.95321L5.5 12.938Z"
          fill="currentColor"
        />
        <path
          d="M163.119 10L70.1191 10C66.8054 10 64.1191 12.6863 64.1191 16V24C64.1191 31.732 70.3872 38 78.1191 38L155.119 38C162.851 38 169.119 31.732 169.119 24V16C169.119 12.6863 166.433 10 163.119 10Z"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          d="M155 11L78 36.5"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <rect
          x="111"
          y="18"
          width="12"
          height="12"
          rx="4"
          fill="currentColor"
        />
        <path
          d="M195.679 13.8157C195.775 14.9161 196.745 15.7301 197.845 15.6338L227.731 13.0191L227.383 9.03434L197.497 11.649C196.396 11.7453 195.582 12.7153 195.679 13.8157Z"
          fill="currentColor"
        />
        <rect
          width="4"
          height="16"
          rx="2"
          transform="matrix(1 2.22734e-09 2.22734e-09 -1 227.273 19.0386)"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_344_210">
          <rect width="234.162" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

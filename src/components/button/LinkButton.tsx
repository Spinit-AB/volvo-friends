import LinkNextJs from "next/link";
import styles from "./Button.module.css";
import { TButton } from "./Button";

export const LinkButton = ({
  variant = "filled",
  color = "teal",
  forcePalette,
  size = "base",
  className,
  children,
  ...rest
}: TButton & React.ComponentProps<typeof LinkNextJs>) => {
  return (
    <LinkNextJs
      {...rest}
      className={[
        styles.root,
        styles[variant],
        styles[color],
        styles[size],
        forcePalette ? styles[forcePalette] : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </LinkNextJs>
  );
};

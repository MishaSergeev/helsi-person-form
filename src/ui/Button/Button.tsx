import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const Button = ({ children, className = "", ...props }: Props) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

/* eslint-disable */
import React from "react";

type ButtonProps = {
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant = "contained", size = "medium", ...rest } = props;
  return (
    <button data-testid="button" {...rest}>
      {children}
    </button>
  );
};

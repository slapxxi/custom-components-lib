/* eslint-disable */
import React from "react";

type TextFieldProps = {
  error?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const TextField: React.FC<TextFieldProps> = (props) => {
  const { children, error, ...rest } = props;

  return (
    <div {...rest}>
      <input type="text" />
    </div>
  );
};

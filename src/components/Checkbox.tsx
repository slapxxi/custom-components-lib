/* eslint-disable */
import React from "react";

type CheckboxProps = {} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  let { children, ...rest } = props;
  return (
    <button {...rest}>
      <input type="checkbox" />
    </button>
  );
};

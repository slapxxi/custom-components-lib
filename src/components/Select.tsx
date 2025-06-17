/* eslint-disable */
import React from "react";

type SelectProps = {} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export const Select: React.FC<SelectProps> = (props) => {
  let { children, ...rest } = props;
  return <select {...rest}>{children}</select>;
};

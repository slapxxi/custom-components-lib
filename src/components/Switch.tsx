/* eslint-disable */
import React from "react";

type SwitchProps = {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Switch: React.FC<SwitchProps> = (props) => {
  let {
    children,
    checked = false,
    disabled = false,
    onChange,
    ...rest
  } = props;

  return (
    <button>
      <input type="radio" {...rest} />
    </button>
  );
};

/* eslint-disable */
import React from "react";

type ModalProps = {
  open?: boolean;
  onClose?: () => void;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Modal: React.FC<ModalProps> = (props) => {
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

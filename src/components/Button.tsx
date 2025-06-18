import React from 'react';
import styles from './Button.module.css';
import { useRipple } from '../hooks/useRipple';
import { capitalizeFirstLetter } from '../lib/utils';

type ButtonProps = {
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
} & React.ComponentPropsWithRef<'button'>;

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant = 'contained', size = 'medium', ...rest } = props;
  const rippleRef = useRipple<HTMLButtonElement>();

  return (
    <button
      data-testid="button"
      ref={rippleRef}
      className={`${styles.button} ${variantToCn(variant)} ${variantToCn(size)}`}
      {...rest}
    >
      {children}
    </button>
  );
};

function variantToCn(variant: string) {
  return styles[`button${capitalizeFirstLetter(variant)}`];
}

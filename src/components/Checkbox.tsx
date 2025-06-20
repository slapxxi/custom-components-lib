import React, { useEffect, useId } from 'react';
import styles from './Checkbox.module.css';
import { classNames } from '../lib/utils';
import { useRipple } from '../hooks/useRipple';
import { useInitialRender } from '../hooks/useInitialRender';

type BaseCheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};

type CheckboxProps = BaseCheckboxProps &
  Omit<React.ComponentPropsWithRef<'input'>, keyof BaseCheckboxProps>;

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { checked, disabled, id, onChange, ...rest } = props;
  const rId = useId();
  const [rippleRef, triggerRipple] = useRipple<HTMLLabelElement>({
    manual: true,
  });
  const initialRender = useInitialRender();

  useEffect(() => {
    if (!initialRender) {
      triggerRipple();
    }
  }, [checked]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e.currentTarget.checked);
    triggerRipple();
  }

  return (
    <label
      className={classNames(
        styles.container,
        checked && styles.containerChecked,
        disabled && styles.containerDisabled
      )}
      htmlFor={id || rId}
    >
      <input
        id={id || rId}
        className={styles.input}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      />

      <span className={styles.backdrop} ref={rippleRef}></span>

      {!checked && (
        <svg
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={styles.icon}
        >
          <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
        </svg>
      )}

      {checked && (
        <svg
          focusable={false}
          aria-hidden
          viewBox="0 0 24 24"
          className={styles.icon}
        >
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      )}
    </label>
  );
};

import React, { useId } from 'react';
import styles from './TextField.module.css';
import { classNames } from '../lib/utils';

type TextFieldProps = {
  label?: string;
  error?: string;
} & React.ComponentPropsWithRef<'input'>;

export const TextField: React.FC<TextFieldProps> = (props) => {
  const { label, error, id, ...rest } = props;
  const rId = useId();

  return (
    <label
      className={classNames(styles.container, error && styles.containerError)}
      htmlFor={id || rId}
    >
      <input
        type="text"
        className={styles.input}
        placeholder=" "
        id={id || rId}
        {...rest}
      />
      <span className={styles.label} data-testid="label">
        {error ? 'Error' : label}
      </span>
      {error && (
        <span className={styles.error} data-testid="error">
          {error}
        </span>
      )}
    </label>
  );
};

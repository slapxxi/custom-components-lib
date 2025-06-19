import React, { useEffect } from 'react';
import styles from './Switch.module.css';
import { useRipple } from '../hooks/useRipple';
import { classNames } from '../lib/utils';

type SwitchProps = {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
} & React.ComponentPropsWithRef<'input'>;

export const Switch: React.FC<SwitchProps> = (props) => {
  const { checked = false, disabled = false, onChange, ...rest } = props;
  const [rippleRef, triggerRipple] = useRipple({
    position: [0.5, 0.5],
    manual: true,
  });

  function handleClick() {
    if (disabled) {
      return;
    }
    onChange?.(!checked);
    triggerRipple();
  }

  useEffect(() => {
    triggerRipple();
  }, [checked]);

  return (
    <span
      className={classNames(
        styles.container,
        checked && styles.containerChecked,
        disabled && styles.containerDisabled
      )}
      onClick={handleClick}
      data-testid="switch"
    >
      <span className={styles.base} ref={rippleRef}>
        <input
          type="checkbox"
          className={classNames(styles.input)}
          checked={checked}
          disabled={disabled}
          readOnly
          {...rest}
        />
        <span className={styles.thumb}></span>
      </span>
      <span className={styles.track}></span>
    </span>
  );
};

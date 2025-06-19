import React, { useRef, useState } from 'react';
import styles from './Select.module.css';
import { createPortal } from 'react-dom';
import { useRipple } from '../hooks/useRipple';
import { classNames } from '../lib/utils';
import { useClickOutside } from '../hooks/useClickOutside';

const SelectItemSymbol = Symbol('SelectItem');

type SelectItemValue = {
  value: SelectItemProps['value'];
  children: SelectItemProps['children'];
};

type ModifiedEvent<T extends React.SyntheticEvent> = T & {
  [SelectItemSymbol]: SelectItemValue;
};

type SelectProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
  onChange: (value: string) => void;
};

type SelectStatus = 'idle' | 'open' | 'dirty' | 'selected';

export const Select: React.FC<SelectProps> = (props) => {
  const { children, value = '', label, onChange } = props;
  const [status, setStatus] = useState<SelectStatus>('idle');
  const [output, setOutput] = useState<React.ReactNode>(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside([containerRef, menuRef], () => {
    switch (status) {
      case 'open':
        setStatus('dirty');
        break;
      case 'dirty':
        setStatus('idle');
        break;
      default:
        break;
    }
  });

  function handleClick() {
    if (status === 'idle' || status === 'dirty') {
      setStatus('open');
      return;
    }
    if (status === 'open') {
      setStatus('idle');
    }
  }

  function handleChange(selectItemValue: SelectItemValue) {
    setStatus('dirty');
    setOutput(selectItemValue.children);
    onChange?.(selectItemValue.value);
  }

  return (
    <div ref={containerRef} className={styles.container} onClick={handleClick}>
      <div className={styles.output}>{output || label}</div>

      <svg focusable={false} aria-hidden viewBox="0 0 24 24" width="24">
        <path d="M7 10l5 5 5-5z" />
      </svg>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{label}</legend>
      </fieldset>

      <SelectMenu
        open={status === 'open'}
        ref={menuRef}
        parentRef={containerRef}
        onChange={handleChange}
      >
        {children}
      </SelectMenu>
    </div>
  );
};

type SelectItemProps = {
  value: string;
  children: React.ReactNode;
};

export const SelectItem: React.FC<SelectItemProps> = (props) => {
  const { children, value } = props;
  const [rippleRef] = useRipple<HTMLDivElement>();

  function handleClick(e: React.MouseEvent) {
    Object.defineProperty(e, SelectItemSymbol, {
      value: { value, children },
    });
  }

  return (
    <div className={styles.item} onClick={handleClick} ref={rippleRef}>
      {children}
    </div>
  );
};

type SelectMenuProps = {
  open: boolean;
  children?: React.ReactNode;
  parentRef?: React.RefObject<HTMLElement | null>;
  onChange: (item: SelectItemValue) => void;
};

// eslint-disable-next-line
const SelectMenu = React.forwardRef<HTMLDivElement, SelectMenuProps>(
  (props, ref) => {
    const { open, children, parentRef } = props;
    const rect = parentRef?.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

    function handleClick(e: ModifiedEvent<React.MouseEvent>) {
      const value = e[SelectItemSymbol];
      if (open && value) {
        props.onChange(value);
      }
    }

    return createPortal(
      <div
        className={classNames(styles.menu, open && styles.menuOpen)}
        ref={ref}
        style={{ left: rect.x, top: rect.y + rect.height }}
        onClick={(e: React.MouseEvent) =>
          handleClick(e as ModifiedEvent<React.MouseEvent>)
        }
      >
        {children}
      </div>,
      document.body
    );
  }
);

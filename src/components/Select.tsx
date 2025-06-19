import React, {
  createContext,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styles from './Select.module.css';
import { createPortal } from 'react-dom';
import { useRipple } from '../hooks/useRipple';
import { classNames } from '../lib/utils';
import { useClickOutside } from '../hooks/useClickOutside';
import { useOnScroll } from '../hooks/useOnScroll';

type SelectItemValue = {
  value: SelectItemProps['value'];
  children: SelectItemProps['children'];
};

type SelectProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
  onChange?: (value: string) => void;
};

type SelectStatus = 'idle' | 'open' | 'dirty' | 'selected';

type ChildrenMap = Record<string, React.ReactNode>;

type TSelectContext = {
  value?: string;
  map: React.MutableRefObject<ChildrenMap>;
  change: (item: SelectItemValue) => void;
};

const SelectContext = createContext<TSelectContext | null>(null);

function useSelectContext() {
  const context = useContext(SelectContext);
  return context;
}

export const Select: React.FC<SelectProps> = (props) => {
  const { children, value, label, onChange } = props;
  const id = useId();
  const mapRef = useRef<ChildrenMap>({});
  const [status, setStatus] = useState<SelectStatus>('idle');
  const [output, setOutput] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnScroll(() => {
    if (status === 'open') {
      setStatus('idle');
    }
  });

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

  function handleChange(selectedItem: SelectItemValue) {
    setStatus('idle');

    if (onChange) {
      onChange?.(selectedItem.value);
      setOutput(selectedItem.children as unknown as string);
    }
  }

  useLayoutEffect(() => {
    if (value) {
      // @ts-expect-error cause big reasons
      setOutput(mapRef.current[value] ?? label);
    } else {
      setOutput(label);
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className={classNames(
        styles.container,
        (value || status === 'open' || status === 'dirty') &&
          styles.containerActive
      )}
      onClick={handleClick}
    >
      <label
        htmlFor={id}
        className={classNames(
          styles.label,
          (value || status === 'open' || status === 'dirty') &&
            styles.labelActive
        )}
      >
        {label}
      </label>

      <div className={classNames(styles.output, value && styles.outputActive)}>
        {value ? output : label}
      </div>

      {status !== 'open' && (
        <svg
          focusable={false}
          aria-hidden
          viewBox="0 0 24 24"
          width="24"
          className={styles.icon}
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      )}

      {status === 'open' && (
        <svg
          focusable="false"
          aria-hidden
          viewBox="0 0 24 24"
          width="24"
          className={styles.icon}
        >
          <path d="M7 15 12 10 17 15Z" />
        </svg>
      )}

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{label}</legend>
      </fieldset>

      <SelectContext.Provider
        value={{ value, change: handleChange, map: mapRef }}
      >
        <SelectMenu
          open={status === 'open'}
          ref={menuRef}
          parentRef={containerRef}
        >
          {children}
        </SelectMenu>
      </SelectContext.Provider>
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
  const selectContext = useSelectContext();

  if (selectContext) {
    selectContext.map.current[value] = children;
  }

  function handleClick() {
    if (selectContext) {
      selectContext.change({ value, children });
    }
  }

  return (
    <div
      className={classNames(
        styles.item,
        value === selectContext?.value && styles.itemActive
      )}
      onClick={handleClick}
      ref={rippleRef}
    >
      {children}
    </div>
  );
};

type SelectMenuProps = {
  open: boolean;
  children?: React.ReactNode;
  parentRef?: React.RefObject<HTMLElement | null>;
};

const SelectMenu = React.forwardRef<HTMLDivElement, SelectMenuProps>(
  (props, ref) => {
    const { open, children, parentRef } = props;
    const rect = parentRef?.current?.getBoundingClientRect() ?? {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    };

    return createPortal(
      <div
        className={classNames(styles.menu, open && styles.menuOpen)}
        ref={ref}
        style={{
          left: rect.left,
          top: rect.top + rect.height,
          minWidth: rect.width,
        }}
      >
        {children}
      </div>,
      document.body
    );
  }
);

SelectMenu.displayName = 'SelectMenu';

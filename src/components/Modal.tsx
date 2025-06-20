import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import { classNames } from '../lib/utils';
import { disableBodyScroll, enableBodyScroll } from '../lib/scrollLock';

type ModalProps = {
  open?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
};

export const Modal: React.FC<ModalProps> = (props) => {
  const { open, onClose, children } = props;
  const modalContainerRef = useRef<HTMLDivElement>(
    document.createElement('div')
  );

  useEffect(() => {
    modalContainerRef.current.classList.add(styles.root);

    document.body.appendChild(modalContainerRef.current);

    return () => {
      document.body.removeChild(modalContainerRef.current);
    };
  }, []);

  useEffect(() => {
    if (open) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  }, [open]);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const t = e.target as HTMLElement;
    const closest = t.closest(`.${styles.content}`);

    if (!closest) {
      onClose?.();
    }
  }

  return createPortal(
    <div
      data-testid="modal"
      className={classNames(styles.container, open && styles.containerOpen)}
      onClick={handleClick}
    >
      <div className={styles.content}>{children}</div>
    </div>,
    modalContainerRef.current
  );
};

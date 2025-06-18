import { useEffect, useRef } from 'react';
import styles from './useRipple.module.css';

type Position = [number, number];

export function useRipple<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    const container = ref.current;

    function handleClick(e: MouseEvent) {
      const ct = e.currentTarget as HTMLElement;
      const rect = ct.getBoundingClientRect();
      const dx = (e.clientX - rect.x) / rect.width;
      const dy = (e.clientY - rect.y) / rect.height;
      appendEffect(ct, [dx, dy]);
    }

    container.addEventListener('pointerdown', handleClick);
    container.classList.add(styles.root);

    return () => {
      if (container !== null) {
        container.removeEventListener('pointerdown', handleClick);
        container.classList.remove(styles.root);
      }
    };
  }, [ref.current]);

  return ref;
}

function appendEffect(node: HTMLElement, pos: Position = [0.5, 0.5]) {
  let container: HTMLElement | null;

  if (!(container = node.querySelector(`.${styles.container}`))) {
    container = document.createElement('span');
    container.classList.add(styles.container);
    node.appendChild(container);
  }

  const effect = document.createElement('span');
  effect.classList.add(styles.effect);
  effect.style.left = `${pos[0] * 100}%`;
  effect.style.top = `${pos[1] * 100}%`;

  effect.addEventListener('animationend', (e) => {
    const ct = e.currentTarget as HTMLElement;

    if (ct === null) {
      return;
    }

    if (ct.classList.contains(styles.effectFinished)) {
      ct.remove();
    } else {
      ct.classList.add(styles.effectFinished);
    }
  });

  container.appendChild(effect);
}

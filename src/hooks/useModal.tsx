import styles from './useModal.module.css';

export function useModal() {
  const rootEl = document.querySelector(styles.root);
  console.log(rootEl);
}

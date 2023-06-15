import { useState, useEffect } from 'react';

export const useModalActivityState = (refs: (HTMLElement | null)[], onAwayClick?: () => void, onRefElementClick?: () => void, isNotClickAway?: boolean) => {

  /** Активно ли окно. */
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isNotClickAway) {
      return;
    }
    window.addEventListener('mousedown', onClickAwayCheck);
    return () => window.removeEventListener('mousedown', onClickAwayCheck);
  }, [refs]);

  /**
   * Ф-ция проверки мисс клика.
   * @param event - Событие клика.
   */
  function onClickAwayCheck(this: Window, event: globalThis.MouseEvent) {
    const path = event.composedPath();
    const isClickAway = refs.every(ref => ref !== null && !path.includes(ref));

    if (isClickAway && isActive) {
      setIsActive(false);
      onAwayClick?.();
    } else {
      onRefElementClick?.();
    }
  }

  return { isActive, setIsActive };

};

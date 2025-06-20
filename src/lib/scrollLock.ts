/* eslint-disable */
export interface BodyScrollOptions {
  reserveScrollBarGap?: boolean;
  allowTouchMove?: (el: EventTarget) => boolean;
}

interface Lock {
  targetElement: HTMLElement;
  options: BodyScrollOptions;
}

let hasPassiveEvents = false;

if (typeof window !== 'undefined') {
  const passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true;
      return false;
    },
  };

  window.addEventListener('testPassive', null as any, passiveTestOptions);
  window.removeEventListener('testPassive', null as any, passiveTestOptions);
}

const isIosDevice =
  typeof window !== 'undefined' &&
  window.navigator &&
  window.navigator.platform &&
  (/iP(ad|hone|od)/.test(window.navigator.platform) ||
    (window.navigator.platform === 'MacIntel' &&
      window.navigator.maxTouchPoints > 1));

type HandleScrollEvent = TouchEvent;

let locks: Lock[] = [];
let documentListenerAdded = false;
let initialClientY = -1;
let previousBodyOverflowSetting: string | undefined;
let previousBodyPosition:
  | {
      position: string;
      top: string;
      left: string;
    }
  | undefined;
let previousBodyPaddingRight: string | undefined;

const allowTouchMove = (el: EventTarget | null): boolean =>
  locks.some(
    (lock) =>
      lock.options.allowTouchMove && el && lock.options.allowTouchMove(el)
  );

const preventDefault = (rawEvent: HandleScrollEvent): boolean => {
  const e = rawEvent || (window.event as TouchEvent);

  if (allowTouchMove(e.target)) return true;
  if (e.touches.length > 1) return true;

  if (e.preventDefault) e.preventDefault();

  return false;
};

const setOverflowHidden = (options?: BodyScrollOptions) => {
  if (previousBodyPaddingRight === undefined) {
    const reserveScrollBarGap = !!options?.reserveScrollBarGap;
    const scrollBarGap =
      window.innerWidth - document.documentElement.clientWidth;

    if (reserveScrollBarGap && scrollBarGap > 0) {
      const computedBodyPaddingRight = parseInt(
        window
          .getComputedStyle(document.body)
          .getPropertyValue('padding-right'),
        10
      );
      previousBodyPaddingRight = document.body.style.paddingRight;
      document.body.style.paddingRight = `${computedBodyPaddingRight + scrollBarGap}px`;
    }
  }

  if (previousBodyOverflowSetting === undefined) {
    previousBodyOverflowSetting = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
};

const restoreOverflowSetting = () => {
  if (previousBodyPaddingRight !== undefined) {
    document.body.style.paddingRight = previousBodyPaddingRight;
    previousBodyPaddingRight = undefined;
  }

  if (previousBodyOverflowSetting !== undefined) {
    document.body.style.overflow = previousBodyOverflowSetting;
    previousBodyOverflowSetting = undefined;
  }
};

const setPositionFixed = () =>
  window.requestAnimationFrame(() => {
    if (previousBodyPosition === undefined) {
      previousBodyPosition = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
      };

      const { scrollY, scrollX, innerHeight } = window;
      document.body.style.position = 'fixed';
      document.body.style.top = `${-scrollY}px`;
      document.body.style.left = `${-scrollX}px`;

      setTimeout(() => {
        window.requestAnimationFrame(() => {
          const bottomBarHeight = innerHeight - window.innerHeight;
          if (bottomBarHeight && scrollY >= innerHeight) {
            document.body.style.top = `${-(scrollY + bottomBarHeight)}px`;
          }
        });
      }, 300);
    }
  });

const restorePositionSetting = () => {
  if (previousBodyPosition !== undefined) {
    const y = -parseInt(document.body.style.top, 10);
    const x = -parseInt(document.body.style.left, 10);

    document.body.style.position = previousBodyPosition.position;
    document.body.style.top = previousBodyPosition.top;
    document.body.style.left = previousBodyPosition.left;

    window.scrollTo(x, y);

    previousBodyPosition = undefined;
  }
};

const isTargetElementTotallyScrolled = (targetElement: HTMLElement): boolean =>
  targetElement
    ? targetElement.scrollHeight - targetElement.scrollTop <=
      targetElement.clientHeight
    : false;

const handleScroll = (
  event: HandleScrollEvent,
  targetElement: HTMLElement
): boolean => {
  const clientY = event.targetTouches[0].clientY - initialClientY;

  if (allowTouchMove(event.target)) {
    return false;
  }

  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    return preventDefault(event);
  }

  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    return preventDefault(event);
  }

  event.stopPropagation();
  return true;
};

export const disableBodyScroll = (
  targetElement: HTMLElement,
  options?: BodyScrollOptions
): void => {
  if (!targetElement) {
    console.error(
      'disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.'
    );
    return;
  }

  if (locks.some((lock) => lock.targetElement === targetElement)) return;

  const lock: Lock = {
    targetElement,
    options: options || {},
  };

  locks = [...locks, lock];

  if (isIosDevice) {
    setPositionFixed();
  } else {
    setOverflowHidden(options);
  }

  if (isIosDevice) {
    targetElement.ontouchstart = (event: HandleScrollEvent) => {
      if (event.targetTouches.length === 1) {
        initialClientY = event.targetTouches[0].clientY;
      }
    };

    targetElement.ontouchmove = (event: HandleScrollEvent) => {
      if (event.targetTouches.length === 1) {
        handleScroll(event, targetElement);
      }
    };

    if (!documentListenerAdded) {
      document.addEventListener(
        'touchmove',
        preventDefault,
        hasPassiveEvents ? { passive: false } : undefined
      );
      documentListenerAdded = true;
    }
  }
};

export const clearAllBodyScrollLocks = (): void => {
  if (isIosDevice) {
    locks.forEach((lock: Lock) => {
      lock.targetElement.ontouchstart = null;
      lock.targetElement.ontouchmove = null;
    });

    if (documentListenerAdded) {
      document.removeEventListener(
        'touchmove',
        preventDefault,
        hasPassiveEvents ? { passive: false } : undefined
      );
      documentListenerAdded = false;
    }

    initialClientY = -1;
  }

  if (isIosDevice) {
    restorePositionSetting();
  } else {
    restoreOverflowSetting();
  }

  locks = [];
};

export const enableBodyScroll = (targetElement: HTMLElement): void => {
  if (!targetElement) {
    console.error(
      'enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.'
    );
    return;
  }

  locks = locks.filter((lock) => lock.targetElement !== targetElement);

  if (isIosDevice) {
    targetElement.ontouchstart = null;
    targetElement.ontouchmove = null;

    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener(
        'touchmove',
        preventDefault,
        hasPassiveEvents ? { passive: false } : undefined
      );
      documentListenerAdded = false;
    }
  }

  if (isIosDevice) {
    restorePositionSetting();
  } else {
    restoreOverflowSetting();
  }
};

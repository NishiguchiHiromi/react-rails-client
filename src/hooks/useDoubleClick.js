import { useRef } from 'react';

const useDoubleClick = ({ onClick, onDoubleClick }) => {
  const elementRef = useRef(null);
  const countRef = useRef(0);

  const handleClick = (...args) => {
    const el = args[0].target;
    if (elementRef.current === el) {
      countRef.current += 1;
    } else {
      countRef.current = 1;
    }
    elementRef.current = el;

    if (countRef.current === 2) {
      onDoubleClick(...args);
    }

    setTimeout(() => {
      if (elementRef.current === el) {
        if (countRef.current === 1) {
          onClick(...args);
        }
        countRef.current = 0;
      }
    }, 250);
  };
  return [handleClick];
};
export default useDoubleClick;

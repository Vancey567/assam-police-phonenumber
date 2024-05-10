import { useCallback, useRef } from "react";

const useDebounce = (fn, delay) => {
  let timeout = useRef(null);

  let debounce = useCallback(
    function () {
      const context = this;
      const args = arguments;

      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        fn.apply(context, args);
        
        timeout.current = null;
      }, delay);
    },
    [fn, delay]
  );

  return debounce;
};

export default useDebounce;

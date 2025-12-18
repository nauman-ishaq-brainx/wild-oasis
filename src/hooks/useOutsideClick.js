import { useEffect, useRef } from "react";

export function useOutsideClick(close) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (!ref.current) return;

      if (!ref.current.contains(e.target)) {
        close();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [close]);

  return ref;
}

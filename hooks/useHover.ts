import React from "react";

enum MouseEvt {
  ENTER = "mouseenter",
  LEAVE = "mouseleave",
}

export default function useHover() {
  const [value, setValue] = React.useState(false);

  // Wrap in useCallback so we can use in dependencies below
  const handleMouseOver = React.useCallback(() => setValue(true), []);
  const handleMouseOut = React.useCallback(() => setValue(false), []);

  // Keep track of the last node passed to callbackRef
  // so we can remove its event listeners.
  const ref = React.useRef<HTMLElement | null>(null);

  // Use a callback ref instead of useEffect so that event listeners
  // get changed in the case that the returned ref gets added to
  // a different element later. With useEffect, changes to ref.current
  // wouldn't cause a rerender and thus the effect would run again.
  const callbackRef = React.useCallback(
    (node) => {
      if (ref.current) {
        ref.current.removeEventListener(MouseEvt.ENTER, handleMouseOver);
        ref.current.removeEventListener(MouseEvt.LEAVE, handleMouseOut);
      }

      ref.current = node;

      if (ref.current) {
        ref.current.addEventListener(MouseEvt.ENTER, handleMouseOver);
        ref.current.addEventListener(MouseEvt.LEAVE, handleMouseOut);
      }
    },
    [handleMouseOver, handleMouseOut],
  );

  return [callbackRef, value];
}

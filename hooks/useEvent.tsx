import React from "react";

export default function useEvent(keys: string[], handler: () => void) {
  React.useEffect(() => {
    const handlePress = ({ key }: { key: string }) => {
      if (keys.includes(key)) {
        handler();
      }
    };
    window.addEventListener("keyup", handlePress);

    return () => {
      window.removeEventListener("keyup", handlePress);
    };
  }, [keys, handler]);
}

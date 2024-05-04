
import { useEffect, useState } from "react";

type Options = {
  onKeyDown?: () => unknown;
  onKeyUp?: () => unknown;
};

export function useKeyPress(target: string, options: Options): boolean {
  const { onKeyDown: onKeyPress, onKeyUp: onKeyRelease } = options;
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleKeyOperations = ({ type, key }: KeyboardEvent) => {
    setIsPressed((prevValue) => !prevValue);
    if (type === "keydown" && key === target) onKeyPress?.();
    if (type === "keyup" && key === target) onKeyRelease?.();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyOperations);
    window.addEventListener("keyup", handleKeyOperations);

    return () => {
      window.removeEventListener("keydown", handleKeyOperations);
      window.removeEventListener("keyup", handleKeyOperations);
    };
  }, []);

  return isPressed;
}

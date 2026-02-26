import { useEffect, useState } from "react";
import type { KeyEvent } from "../../entities/key";
import { onKeyEvent } from "../../shared/lib/tauri";

export function useKeyEvents() {
  const [keyState, setKeyState] = useState<KeyEvent>({
    keys: Array(11).fill(false),
    layer: 0,
  });

  useEffect(() => {
    const unlisten = onKeyEvent((event) => {
      setKeyState(event);
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return keyState;
}

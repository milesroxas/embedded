import { useEffect, useState } from "react";
import type { PotEvent } from "../../entities/key";
import { onPotValue } from "../../shared/lib/tauri";

export function usePotValue() {
  const [potState, setPotState] = useState<PotEvent>({
    value: 0,
    layer: 0,
  });

  useEffect(() => {
    const unlisten = onPotValue((event) => {
      setPotState(event);
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return potState;
}

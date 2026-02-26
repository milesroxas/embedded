import { keycodeToLabel } from "../../shared/lib/keycode-labels";

interface KeyLabelProps {
  keycode: string;
}

export function KeyLabel({ keycode }: KeyLabelProps) {
  const label = keycodeToLabel(keycode);

  return (
    <div className="key-cell layer-view" title={keycode}>
      {label}
    </div>
  );
}

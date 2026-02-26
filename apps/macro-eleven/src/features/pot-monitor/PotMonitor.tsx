import { PotGauge } from "./PotGauge";
import { usePotValue } from "./usePotValue";

const LAYER_POT_FUNCTIONS: Record<number, string> = {
  0: "Volume Control",
  2: "Figma Layer Navigation",
};

export function PotMonitor() {
  const { value, layer } = usePotValue();
  const functionLabel = LAYER_POT_FUNCTIONS[layer] ?? "No function assigned";

  return (
    <div className="pot-monitor">
      <p style={{ color: "var(--muted-foreground)", fontSize: 14 }}>
        Current layer: {layer}
      </p>
      <PotGauge value={value} />
      <div style={{ textAlign: "center" }}>
        <p className="pot-label">Potentiometer Function</p>
        <p style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>
          {functionLabel}
        </p>
      </div>
    </div>
  );
}

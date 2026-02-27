import { KnobDial } from "../../shared/ui/KnobDial";

const MAX_POT_VALUE = 1023;

interface PotGaugeProps {
  value: number;
}

export function PotGauge({ value }: PotGaugeProps) {
  const normalized = Math.min(value / MAX_POT_VALUE, 1);

  return (
    <div className="flex flex-col items-center gap-4">
      <KnobDial value={normalized} ticks={31} label="Potentiometer" />
      <span className="text-4xl font-bold tracking-tight tabular-nums text-foreground">
        {value}
      </span>
    </div>
  );
}

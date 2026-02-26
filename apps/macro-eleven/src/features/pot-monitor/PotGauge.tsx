const MAX_POT_VALUE = 1023;

interface PotGaugeProps {
  value: number;
}

export function PotGauge({ value }: PotGaugeProps) {
  const percent = Math.min((value / MAX_POT_VALUE) * 100, 100);

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">Value</span>
        <span className="text-4xl font-bold tracking-tight tabular-nums text-foreground">
          {value}
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-100 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span>{MAX_POT_VALUE}</span>
      </div>
    </div>
  );
}

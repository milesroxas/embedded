const MAX_POT_VALUE = 1023;

interface PotGaugeProps {
  value: number;
}

export function PotGauge({ value }: PotGaugeProps) {
  const percent = Math.min((value / MAX_POT_VALUE) * 100, 100);

  return (
    <div className="pot-gauge">
      <div className="pot-value">{value}</div>
      <div className="pot-gauge-bar">
        <div
          className="pot-gauge-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span className="pot-label">0</span>
        <span className="pot-label">{MAX_POT_VALUE}</span>
      </div>
    </div>
  );
}

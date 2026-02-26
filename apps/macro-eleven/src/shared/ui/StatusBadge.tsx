import type { ConnectionStatus } from "../../entities/device";

interface StatusBadgeProps {
  status: ConnectionStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const label =
    status === "connected"
      ? "Connected"
      : status === "connecting"
        ? "Connecting..."
        : "Disconnected";

  return (
    <span className={`status-badge status-${status}`}>
      <span className="status-dot" />
      {label}
    </span>
  );
}

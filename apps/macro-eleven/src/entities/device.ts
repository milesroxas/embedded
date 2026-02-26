export type ConnectionStatus = "connected" | "disconnected" | "connecting";

export interface DeviceInfo {
  connected: boolean;
}

export interface DeviceStatusEvent {
  connected: boolean;
}

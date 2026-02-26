import { useState } from "react";
import { MacropadGrid } from "../../shared/ui/MacropadGrid";
import { KeyCell } from "./KeyCell";
import { useKeyEvents } from "./useKeyEvents";
import { setTestMode } from "../../shared/lib/tauri";

export function KeyTester() {
  const { keys, layer } = useKeyEvents();
  const [testMode, setTestModeState] = useState(false);

  const handleToggleTestMode = async () => {
    const newState = !testMode;
    setTestModeState(newState);
    try {
      await setTestMode(newState);
    } catch (error) {
      console.error("Failed to set test mode:", error);
      setTestModeState(!newState); // Revert on error
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: 0 }}>
          Current layer: {layer} — Press keys on the macropad to see them light up.
        </p>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>Test Mode</span>
          <div
            className={`test-mode-toggle ${testMode ? "active" : ""}`}
            onClick={handleToggleTestMode}
          >
            <div className="test-mode-toggle-slider" />
          </div>
          {testMode && (
            <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 500 }}>
              (Keys disabled)
            </span>
          )}
        </label>
      </div>
      <MacropadGrid
        renderKey={(index) => (
          <KeyCell index={index} pressed={keys[index] ?? false} />
        )}
      />
    </div>
  );
}

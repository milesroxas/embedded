import { useState } from "react";
import { MacropadGrid } from "../../shared/ui/MacropadGrid";
import { KeyCell } from "./KeyCell";
import { useKeyEvents } from "../../shared/lib/useKeyEvents";
import { setTestMode } from "../../shared/lib/tauri";
import { cn } from "../../shared/lib/utils";

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
      setTestModeState(!newState);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Key Tester</h2>
          <p className="text-sm text-muted-foreground">
            Visualize key presses and test layer switching.
          </p>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-1 text-sm shadow-sm">
                <span className="text-muted-foreground">Current Layer:</span>
                <span className="font-mono font-medium">{layer}</span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Test Mode
            </span>
            <button
                role="switch"
                aria-checked={testMode}
                onClick={handleToggleTestMode}
                className={cn(
                "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
                testMode ? "bg-primary" : "bg-input"
                )}
            >
                <span
                className={cn(
                    "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
                    testMode ? "translate-x-4" : "translate-x-0"
                )}
                />
            </button>
            </label>
        </div>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-10 flex justify-center bg-muted/20">
            <MacropadGrid
                renderKey={(index) => (
                <KeyCell index={index} pressed={keys[index] ?? false} />
                )}
            />
        </div>
        <div className="flex items-center p-4 border-t bg-muted/40">
            <p className="text-xs text-muted-foreground">
                {testMode 
                    ? "Keys are disabled. Input is intercepted for testing." 
                    : "Keys are enabled. Standard keyboard output active."}
            </p>
        </div>
      </div>
    </div>
  );
}

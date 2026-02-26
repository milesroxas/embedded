import { useState } from "react";
import { MacropadGrid } from "../../shared/ui/MacropadGrid";
import { KeyLabel } from "./KeyLabel";
import { LayerSelector } from "./LayerSelector";
import { useLayerData } from "../../shared/lib/useLayerData";

export function LayerViewer() {
  const { layers, loading, error } = useLayerData();
  const [selectedLayer, setSelectedLayer] = useState(0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p>Loading layers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-destructive">
        <h3 className="font-semibold">Error loading layers</h3>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (layers.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <p>No layers found on device.</p>
      </div>
    );
  }

  const currentLayer = layers.find((l) => l.index === selectedLayer) ?? layers[0];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Layer Viewer</h2>
        <p className="text-sm text-muted-foreground">
          Inspect key assignments for each layer.
        </p>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-4 border-b bg-muted/30">
          <LayerSelector
            layers={layers}
            selected={selectedLayer}
            onSelect={setSelectedLayer}
          />
        </div>
        <div className="p-10 flex justify-center bg-card">
          <MacropadGrid
            renderKey={(index) => (
              <KeyLabel keycode={currentLayer.keys[index] ?? "KC_NO"} />
            )}
          />
        </div>
      </div>
    </div>
  );
}

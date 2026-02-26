import { useState } from "react";
import { MacropadGrid } from "../../shared/ui/MacropadGrid";
import { KeyLabel } from "./KeyLabel";
import { LayerSelector } from "./LayerSelector";
import { useLayerData } from "./useLayerData";

export function LayerViewer() {
  const { layers, loading, error } = useLayerData();
  const [selectedLayer, setSelectedLayer] = useState(0);

  if (loading) {
    return <p style={{ color: "var(--text-secondary)" }}>Loading layers...</p>;
  }

  if (error) {
    return <p style={{ color: "var(--danger)" }}>Error: {error}</p>;
  }

  if (layers.length === 0) {
    return <p style={{ color: "var(--text-secondary)" }}>No layers found.</p>;
  }

  const currentLayer = layers.find((l) => l.index === selectedLayer) ?? layers[0];

  return (
    <div>
      <LayerSelector
        layers={layers}
        selected={selectedLayer}
        onSelect={setSelectedLayer}
      />
      <MacropadGrid
        renderKey={(index) => (
          <KeyLabel keycode={currentLayer.keys[index] ?? "KC_NO"} />
        )}
      />
    </div>
  );
}

import type { LayerData } from "../../entities/layer";

interface LayerSelectorProps {
  layers: LayerData[];
  selected: number;
  onSelect: (index: number) => void;
}

export function LayerSelector({ layers, selected, onSelect }: LayerSelectorProps) {
  return (
    <div className="layer-selector">
      {layers.map((layer) => (
        <button
          key={layer.index}
          className={`layer-tab ${selected === layer.index ? "active" : ""}`}
          onClick={() => onSelect(layer.index)}
        >
          {layer.index}: {layer.name}
        </button>
      ))}
    </div>
  );
}

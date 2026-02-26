import { useEffect, useState } from "react";
import type { LayerData } from "../../entities/layer";
import { getLayerData } from "./tauri";

export function useLayerData() {
  const [layers, setLayers] = useState<LayerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLayerData()
      .then((data) => {
        setLayers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(String(err));
        setLoading(false);
      });
  }, []);

  return { layers, loading, error };
}

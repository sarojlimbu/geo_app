import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MapState {
  center: [number, number];
  zoom: number;
  selectedLayer: "province" | "district" | "municipality";
  // eslint-disable-next-line no-unused-vars
  setCenter: (center: [number, number]) => void;
  // eslint-disable-next-line no-unused-vars
  setZoom: (zoom: number) => void;
  // eslint-disable-next-line no-unused-vars
  setSelectedLayer: (layer: "province" | "district" | "municipality") => void;
}

export const useMapStore = create<MapState>()(
  persist(
    (set) => ({
      center: [9369896.109309163, 3349333.019857424],
      zoom: 7,
      selectedLayer: "province",
      setCenter: (center) => set({ center }),
      setZoom: (zoom) => set({ zoom }),
      setSelectedLayer: (layer) => set({ selectedLayer: layer }),
    }),
    {
      name: "map-store", // localStorage key
    },
  ),
);

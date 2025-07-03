// import React, { useEffect, useRef } from "react";
// import "ol/ol.css";
// import { singleClick } from "ol/events/condition";
// import MVT from "ol/format/MVT";
// import Select from "ol/interaction/Select";
// import TileLayer from "ol/layer/Tile";
// import VectorTileLayer from "ol/layer/VectorTile";
// import Map from "ol/Map";
// import VectorTileSource from "ol/source/VectorTile";
// import XYZ from "ol/source/XYZ";
// import { Fill, Stroke, Style } from "ol/style";
// import View from "ol/View";

// import { Button } from "@/components/ui/button";
// import { useMapStore } from "@/stores/map/mapStore";

// const layerConfigs = {
//   province: {
//     url: "https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}",
//     style: new Style({
//       stroke: new Stroke({ color: "#d32f2f", width: 1.5 }),
//       fill: new Fill({ color: "rgba(211, 47, 47, 0.2)" }),
//     }),
//   },
//   district: {
//     url: "https://vectortile.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}",
//     style: new Style({
//       stroke: new Stroke({ color: "#1976d2", width: 1.5 }),
//       fill: new Fill({ color: "rgba(25, 118, 210, 0.2)" }),
//     }),
//   },
//   municipality: {
//     url: "https://vectortile.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}",
//     style: new Style({
//       stroke: new Stroke({ color: "#388e3c", width: 1.5 }),
//       fill: new Fill({ color: "rgba(56, 142, 60, 0.2)" }),
//     }),
//   },
// };

// type LayerKey = keyof typeof layerConfigs;

// const MapPage: React.FC = () => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const mapInstance = useRef<Map | null>(null);
//   const currentVectorLayer = useRef<VectorTileLayer | null>(null);
//   const selectRef = useRef<Select | null>(null);

//   const { center, zoom, selectedLayer, setCenter, setZoom, setSelectedLayer } =
//     useMapStore();

//   const createVectorTileLayer = (key: LayerKey): VectorTileLayer => {
//     const { url, style } = layerConfigs[key];

//     return new VectorTileLayer({
//       source: new VectorTileSource({
//         format: new MVT(),
//         url,
//       }),
//       style: () => style,
//     });
//   };

//   useEffect(() => {
//     const baseLayer = new TileLayer({
//       source: new XYZ({
//         url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
//       }),
//     });

//     const map = new Map({
//       target: mapRef.current!,
//       layers: [baseLayer],
//       view: new View({
//         center,
//         zoom,
//         minZoom: 5,
//         maxZoom: 14,
//       }),
//     });

//     mapInstance.current = map;

//     map.getView().on("change:center", () => {
//       const newCenter = map.getView().getCenter();
//       if (newCenter) {
//         setCenter(newCenter as [number, number]);
//       }
//     });

//     map.getView().on("change:resolution", () => {
//       const newZoom = map.getView().getZoom();
//       if (newZoom) {
//         setZoom(newZoom);
//       }
//     });

//     const vectorLayer = createVectorTileLayer(selectedLayer);
//     currentVectorLayer.current = vectorLayer;
//     map.addLayer(vectorLayer);

//     const select = new Select({
//       condition: singleClick,
//       layers: [vectorLayer],
//     });

//     select.on("select", (e) => {
//       if (e.selected.length > 0) {
//         const feature = e.selected[0];
//         const extent = feature.getGeometry()?.getExtent();
//         if (extent) {
//           map.getView().fit(extent, {
//             duration: 700,
//             padding: [50, 50, 50, 50],
//             maxZoom: 12,
//           });
//         }
//       }
//     });

//     map.addInteraction(select);
//     selectRef.current = select;

//     return () => {
//       map.setTarget(undefined);
//     };
//   }, []);

//   useEffect(() => {
//     if (!mapInstance.current) {
//       return;
//     }
//     const map = mapInstance.current;

//     if (currentVectorLayer.current) {
//       map.removeLayer(currentVectorLayer.current);
//     }

//     const newLayer = createVectorTileLayer(selectedLayer);
//     currentVectorLayer.current = newLayer;
//     map.addLayer(newLayer);

//     if (selectRef.current) {
//       map.removeInteraction(selectRef.current);
//     }

//     const select = new Select({
//       condition: singleClick,
//       layers: [newLayer],
//     });

//     select.on("select", (e) => {
//       if (e.selected.length > 0) {
//         const feature = e.selected[0];
//         const extent = feature.getGeometry()?.getExtent();
//         if (extent) {
//           map.getView().fit(extent, {
//             duration: 700,
//             padding: [50, 50, 50, 50],
//             maxZoom: 12,
//           });
//         }
//       }
//     });

//     map.addInteraction(select);
//     selectRef.current = select;
//   }, [selectedLayer]);

//   return (
//     <>
//       <div className="w-full bg-header md:pb-14 md:pt-12 relative pl-2 md:pl-0">
//         <div
//           className="item-col lg:gap-6 md:gap-4 gap-2
//          responsive-view py-10 md:py-12 pt-4 md:pt-10 "
//         >
//           <span className="text-secondary text-sm font-bold"> MAP</span>
//           <div className="text-4xl text-primary">View The Map Tile</div>
//         </div>
//       </div>

//       <div className="responsive-view z-6 bg-white">
//         <div
//           ref={mapRef}
//           className="w-full h-screen md:h-[600px]  shadow-sm relative z-2"
//         >
//           <div className="flex mb-4 absolute top-2 right-0 md:right-2 z-2">
//             {Object.keys(layerConfigs).map((key) => (
//               <Button
//                 key={key}
//                 className={`px-4 py-2 rounded-none font-semibold bg-transparent transition-colors cursor-pointer ${
//                   selectedLayer === key
//                     ? "bg-blue-100 text-primary"
//                     : "bg-gray-200 hover:bg-blue-100"
//                 }`}
//                 onClick={() => setSelectedLayer(key as LayerKey)}
//               >
//                 {key.charAt(0).toUpperCase() + key.slice(1)}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MapPage;

import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { singleClick } from "ol/events/condition";
import MVT from "ol/format/MVT";
import Select from "ol/interaction/Select";
import TileLayer from "ol/layer/Tile";
import VectorTileLayer from "ol/layer/VectorTile";
import Map from "ol/Map";
import VectorTileSource from "ol/source/VectorTile";
import XYZ from "ol/source/XYZ";
import { Fill, Stroke, Style } from "ol/style";
import View from "ol/View";

import { Button } from "@/components/ui/button";
import { useMapStore } from "@/stores/map/mapStore";

const layerConfigs = {
  province: {
    url: "https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}",
    style: new Style({
      stroke: new Stroke({ color: "#d32f2f", width: 1.5 }),
      fill: new Fill({ color: "rgba(211, 47, 47, 0.2)" }),
    }),
  },
  district: {
    url: "https://vectortile.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}",
    style: new Style({
      stroke: new Stroke({ color: "#1976d2", width: 1.5 }),
      fill: new Fill({ color: "rgba(25, 118, 210, 0.2)" }),
    }),
  },
  municipality: {
    url: "https://vectortile.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}",
    style: new Style({
      stroke: new Stroke({ color: "#388e3c", width: 1.5 }),
      fill: new Fill({ color: "rgba(56, 142, 60, 0.2)" }),
    }),
  },
};

type LayerKey = keyof typeof layerConfigs;

const MapPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const currentVectorLayer = useRef<VectorTileLayer | null>(null);
  const selectRef = useRef<Select | null>(null);

  const { center, zoom, selectedLayer, setCenter, setZoom, setSelectedLayer } =
    useMapStore();

  const [loading, setLoading] = useState(true); // 🔹 Track loading state

  const createVectorTileLayer = (key: LayerKey): VectorTileLayer => {
    const { url, style } = layerConfigs[key];

    return new VectorTileLayer({
      source: new VectorTileSource({
        format: new MVT(),
        url,
      }),
      style: () => style,
    });
  };

  useEffect(() => {
    const baseLayer = new TileLayer({
      source: new XYZ({
        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      }),
    });

    const map = new Map({
      target: mapRef.current!,
      layers: [baseLayer],
      view: new View({
        center,
        zoom,
        minZoom: 5,
        maxZoom: 14,
      }),
    });

    mapInstance.current = map;

    map.getView().on("change:center", () => {
      const newCenter = map.getView().getCenter();
      if (newCenter) {
        setCenter(newCenter as [number, number]);
      }
    });

    map.getView().on("change:resolution", () => {
      const newZoom = map.getView().getZoom();
      if (newZoom) {
        setZoom(newZoom);
      }
    });

    const vectorLayer = createVectorTileLayer(selectedLayer);
    currentVectorLayer.current = vectorLayer;
    map.addLayer(vectorLayer);

    const select = new Select({
      condition: singleClick,
      layers: [vectorLayer],
    });

    select.on("select", (e) => {
      if (e.selected.length > 0) {
        const feature = e.selected[0];
        const extent = feature.getGeometry()?.getExtent();
        if (extent) {
          map.getView().fit(extent, {
            duration: 700,
            padding: [50, 50, 50, 50],
            maxZoom: 12,
          });
        }
      }
    });

    map.addInteraction(select);
    selectRef.current = select;

    // ✅ When tile layer finishes loading, stop showing skeleton
    const tileSource = baseLayer.getSource();
    if (tileSource) {
      tileSource.on("tileloadend", () => {
        setLoading(false);
      });
    }

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) {
      return;
    }
    const map = mapInstance.current;

    if (currentVectorLayer.current) {
      map.removeLayer(currentVectorLayer.current);
    }

    const newLayer = createVectorTileLayer(selectedLayer);
    currentVectorLayer.current = newLayer;
    map.addLayer(newLayer);

    if (selectRef.current) {
      map.removeInteraction(selectRef.current);
    }

    const select = new Select({
      condition: singleClick,
      layers: [newLayer],
    });

    select.on("select", (e) => {
      if (e.selected.length > 0) {
        const feature = e.selected[0];
        const extent = feature.getGeometry()?.getExtent();
        if (extent) {
          map.getView().fit(extent, {
            duration: 700,
            padding: [50, 50, 50, 50],
            maxZoom: 12,
          });
        }
      }
    });

    map.addInteraction(select);
    selectRef.current = select;
  }, [selectedLayer]);

  return (
    <>
      <div className="w-full bg-header md:pb-14 md:pt-12 relative pl-2 md:pl-0">
        <div className="item-col lg:gap-6 md:gap-4 gap-2 responsive-view py-10 md:py-12 pt-4 md:pt-10">
          <span className="text-secondary text-sm font-bold"> MAP</span>
          <div className="text-4xl text-primary">View The Map Tile</div>
        </div>
      </div>

      <div className="responsive-view">
        <div className="relative w-full h-screen md:h-[600px] shadow-sm z-10 bg-white">
          {loading && (
            <div className="absolute inset-0  h-screen md:h-[600px]  bg-gray-200 animate-pulse rounded-md" />
          )}

          <div ref={mapRef} className="w-full h-full relative z-0" />

          <div className="flex mb-4 absolute top-2 right-0 md:right-2 z-20">
            {Object.keys(layerConfigs).map((key) => (
              <Button
                key={key}
                className={`px-4 py-2 rounded-none font-semibold bg-transparent transition-colors cursor-pointer ${
                  selectedLayer === key
                    ? "bg-blue-100 text-primary"
                    : "bg-gray-200 hover:bg-blue-100"
                }`}
                onClick={() => setSelectedLayer(key as LayerKey)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MapPage;

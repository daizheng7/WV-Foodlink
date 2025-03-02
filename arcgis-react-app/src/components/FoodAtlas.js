import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";
import { motion } from "framer-motion"; // Animation Library

const FoodAtlas = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    let view;
    let webMap;

    loadModules(["esri/views/MapView", "esri/WebMap", "esri/widgets/Legend"], {
      css: true,
    }).then(([MapView, WebMap, Legend]) => {
      try {
        webMap = new WebMap({
          portalItem: {
            id: "3b78dbf03c374047b4f25437b7fad835", // Ensure this WebMap ID is public
          },
        });

        view = new MapView({
          container: mapRef.current,
          map: webMap,
          center: [-98.5795, 39.8283], // US centered
          zoom: 5,
        });

        // Add a legend
        const legend = new Legend({
          view: view,
        });
        view.ui.add(legend, "bottom-right");
      } catch (error) {
        console.error("Error loading ArcGIS map:", error);
      }
    });

    return () => {
      if (view) view.destroy();
      if (webMap) webMap.destroy();
    };
  }, []);

  return (
    <div className="flex h-screen w-full">
      {/* Map takes full 4/5 space */}
      <div className="w-4/5 h-screen relative">
        <div ref={mapRef} className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>

      {/* Animated Legend Panel - Takes 1/5 */}
      <motion.div
        className="w-1/5 bg-white shadow-lg p-6 flex flex-col justify-center border-l border-gray-300"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Food Access Rankings</h2>
        <ul className="space-y-4 text-sm">
          <motion.li
            className="flex items-center p-2 rounded-lg hover:bg-green-100 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
            <strong>Quantity:</strong> SNAP locations per area.
          </motion.li>
          <motion.li
            className="flex items-center p-2 rounded-lg hover:bg-blue-100 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-4 h-4 bg-blue-500 rounded-full mr-3"></span>
            <strong>Quality:</strong> Fresh and nutritious food.
          </motion.li>
          <motion.li
            className="flex items-center p-2 rounded-lg hover:bg-yellow-100 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></span>
            <strong>Income:</strong> Normalized median household.
          </motion.li>
          <motion.li
            className="flex items-center p-2 rounded-lg hover:bg-red-100 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-4 h-4 bg-red-500 rounded-full mr-3"></span>
            <strong>Vehicle Access:</strong> Transport availability.
          </motion.li>
        </ul>
        <p className="text-xs text-gray-600 mt-6">
          This data highlights disparities in food access across regions.
        </p>
      </motion.div>
    </div>
  );
};

export default FoodAtlas;

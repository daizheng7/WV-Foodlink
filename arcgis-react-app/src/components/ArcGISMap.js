import React, { useRef, useEffect } from "react";
import esriConfig from "@arcgis/core/config";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";

const ArcGISMap = () => {
  const mapDiv = useRef(null);

  useEffect(() => {
    // Set the API key
    esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;

    // Load the web map using its item ID
    const webMap = new WebMap({
      portalItem: {
        id: "51811ead9a794bcdae5007554a236c72" // Replace with your web map's Item ID
      }
    });

    // Create a MapView
    const view = new MapView({
      container: mapDiv.current, // Reference to the map div
      map: webMap,
      zoom: 3 // Optional: Adjust as needed
    });

    // Clean up the view on component unmount
    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  return <div style={{ height: "100vh" }} ref={mapDiv}></div>;
};

export default ArcGISMap;

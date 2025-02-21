import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summaryStats, setSummaryStats] = useState(null);
  const [statewideTotals, setStatewideTotals] = useState(null);

  const FEATURE_SERVICE_URL =
    "https://services1.arcgis.com/cTNi34MxOdcfum3A/arcgis/rest/services/SNAP_WV_FY15_Jan24/FeatureServer/0/query";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${FEATURE_SERVICE_URL}?where=1=1&outFields=County,SNAP_All_Persons_Public_Assista,SNAP_All_Persons_Non_Public_Ass,Calc__SNAP_Total_PA_and_Non_PA_,SNAP_All_Households_Public_Assi,SNAP_All_Households_Non_Public_,Calc__SNAP_Total_PA_and_Non_PA1,SNAP_All_Total_Actual_PA___Non_,State,Region,County,Month_Year&f=json`
        );
        const result = await response.json();

        if (result.error) {
          throw new Error(result.error.message);
        }

        const features = result.features.map((feature) => feature.attributes);
        const sortedFeatures = features.sort(
          (a, b) => new Date(a.Month_Year) - new Date(b.Month_Year)
        );
        const uniqueRegions = Array.from(
          new Set(sortedFeatures.map((item) => item.County))
        ).filter(Boolean);

        setData(sortedFeatures);
        setRegions(uniqueRegions);
        calculateSummaryStats(sortedFeatures);
        calculateStatewideTotals(sortedFeatures);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateSummaryStats = (features) => {
    const stats = {
      totalParticipants: features.reduce(
        (sum, item) => sum + item.Calc__SNAP_Total_PA_and_Non_PA_,
        0
      ),
      avgParticipantsPerCounty:
        features.reduce(
          (sum, item) => sum + item.Calc__SNAP_Total_PA_and_Non_PA_,
          0
        ) / features.length,
      maxParticipants: Math.max(
        ...features.map((item) => item.Calc__SNAP_Total_PA_and_Non_PA_)
      ),
      minParticipants: Math.min(
        ...features.map((item) => item.Calc__SNAP_Total_PA_and_Non_PA_)
      ),
      totalIssuance: features.reduce(
        (sum, item) => sum + item.SNAP_All_Total_Actual_PA___Non_,
        0
      ),
    };
    setSummaryStats(stats);
  };

  const calculateStatewideTotals = (features) => {
    const totals = features.reduce(
      (acc, item) => ({
        publicAssistance:
          acc.publicAssistance + item.SNAP_All_Persons_Public_Assista,
        nonPublicAssistance:
          acc.nonPublicAssistance + item.SNAP_All_Persons_Non_Public_Ass,
        totalIssuance: acc.totalIssuance + item.SNAP_All_Total_Actual_PA___Non_,
      }),
      { publicAssistance: 0, nonPublicAssistance: 0, totalIssuance: 0 }
    );
    setStatewideTotals(totals);
  };

  const exportToCSV = () => {
    const headers = [
      "County",
      "Month/Year",
      "Public Assistance (People)",
      "Non-Public Assistance (People)",
      "Total Issuance (USD)",
    ];
    const rows = filteredData.map((d) => [
      d.County,
      new Date(d.Month_Year).toLocaleDateString(),
      d.SNAP_All_Persons_Public_Assista,
      d.SNAP_All_Persons_Non_Public_Ass,
      d.SNAP_All_Total_Actual_PA___Non_,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) => row.map((cell) => `"${cell}"`).join(","))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "snap_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (selectedRegion && data.length > 0) {
      const filtered = data.filter((item) => item.County === selectedRegion);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [selectedRegion, data]);

  const prepareLineData = () => {
    if (!filteredData || filteredData.length === 0) return [];
    return [
      {
        id: "Public Assistance Participation (People)",
        data: filteredData.map((d) => ({
          x: new Date(d.Month_Year).toLocaleDateString(),
          y: d.SNAP_All_Persons_Public_Assista || 0,
        })),
      },
      {
        id: "Non-Public Assistance Participation (People)",
        data: filteredData.map((d) => ({
          x: new Date(d.Month_Year).toLocaleDateString(),
          y: d.SNAP_All_Persons_Non_Public_Ass || 0,
        })),
      },
      {
        id: "Total Issuance (USD)",
        data: filteredData.map((d) => ({
          x: new Date(d.Month_Year).toLocaleDateString(),
          y: d.SNAP_All_Total_Actual_PA___Non_ || 0,
        })),
      },
    ];
  };

  const prepareBarData = () => {
    if (!filteredData || filteredData.length === 0) return [];
    return filteredData.map((d) => ({
      date: new Date(d.Month_Year).toLocaleDateString(),
      PA: d.SNAP_All_Households_Public_Assi || 0,
      NonPA: d.SNAP_All_Households_Non_Public_ || 0,
    }));
  };

  const preparePieData = () => {
    if (!filteredData || filteredData.length === 0) return [];
    const latest = filteredData[filteredData.length - 1];
    return [
      {
        id: "Public Assistance (Households)",
        value: latest.SNAP_All_Households_Public_Assi || 0,
      },
      {
        id: "Non-Public Assistance (Households)",
        value: latest.SNAP_All_Households_Non_Public_ || 0,
      },
    ];
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>SNAP Data Analysis</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <>
          <div>
            <label htmlFor="region-select">Select a Region: </label>
            <select
              id="region-select"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">-- Select --</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {selectedRegion ? (
            <>
              <div>
                <button onClick={exportToCSV}>Export to CSV</button>
              </div>
              <table border="1" style={{ marginTop: "20px", width: "100%" }}>
                <thead>
                  <tr>
                    <th>County</th>
                    <th>Month/Year</th>
                    <th>Public Assistance (People)</th>
                    <th>Non-Public Assistance (People)</th>
                    <th>Total Issuance (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((d, index) => (
                    <tr key={index}>
                      <td>{d.County}</td>
                      <td>{new Date(d.Month_Year).toLocaleDateString()}</td>
                      <td>{d.SNAP_All_Persons_Public_Assista || 0}</td>
                      <td>{d.SNAP_All_Persons_Non_Public_Ass || 0}</td>
                      <td>{d.SNAP_All_Total_Actual_PA___Non_ || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ height: "500px", marginTop: "20px" }}>
                <ResponsiveLine
                  data={prepareLineData()}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                />
              </div>

              <div style={{ height: "400px", marginTop: "20px" }}>
                <ResponsiveBar
                  data={prepareBarData()}
                  keys={["PA", "NonPA"]}
                  indexBy="date"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                />
              </div>

              <div style={{ height: "400px", marginTop: "20px" }}>
                <ResponsivePie
                  data={preparePieData()}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                />
              </div>
            </>
          ) : (
            <p>Please select a region to view data and graphs.</p>
          )}
        </>
      )}
    </div>
  );
};

export default DataTable;

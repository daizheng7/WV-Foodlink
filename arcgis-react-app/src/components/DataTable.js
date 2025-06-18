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

  // Define styles
  const styles = {
    container: {
      padding: "30px",
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
    },
    header: {
      color: "#2c3e50",
      marginBottom: "25px",
      borderBottom: "2px solid #e7e7e7",
      paddingBottom: "15px",
      fontSize: "28px"
    },
    controlsContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      flexWrap: "wrap",
      gap: "15px"
    },
    selectGroup: {
      display: "flex",
      alignItems: "center",
      gap: "10px"
    },
    label: {
      fontWeight: "600",
      fontSize: "16px",
      color: "#34495e"
    },
    select: {
      padding: "8px 12px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      backgroundColor: "white",
      fontSize: "16px",
      color: "#333",
      minWidth: "200px"
    },
    button: {
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "background-color 0.2s ease",
      ':hover': {
        backgroundColor: "#2980b9"
      }
    },
    table: {
      width: "100%",
      marginTop: "20px",
      borderCollapse: "collapse",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      backgroundColor: "white",
      borderRadius: "4px",
      overflow: "hidden"
    },
    th: {
      backgroundColor: "#34495e",
      color: "white",
      padding: "12px 15px",
      textAlign: "left",
      fontWeight: "600",
      fontSize: "14px"
    },
    td: {
      padding: "10px 15px",
      borderBottom: "1px solid #eee",
      fontSize: "14px"
    },
    chartContainer: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "6px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      marginTop: "30px"
    },
    chartTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "15px",
      color: "#2c3e50"
    },
    loadingMessage: {
      textAlign: "center",
      padding: "40px",
      fontSize: "18px",
      color: "##002855"
    },
    errorMessage: {
      color: "#e74c3c",
      textAlign: "center",
      padding: "20px",
      fontSize: "16px",
      backgroundColor: "#fdf2f2",
      borderRadius: "4px",
      marginTop: "20px"
    },
    selectPrompt: {
      textAlign: "center",
      padding: "40px",
      fontSize: "16px",
      color: "##002855",
      backgroundColor: "#f7f9fa",
      borderRadius: "4px",
      border: "1px dashed #ddd"
    }
  };

  // Custom chart theme
  const chartTheme = {
    axis: {
      ticks: {
        line: {
          stroke: "#555"
        },
        text: {
          fill: "#333",
          fontSize: 12
        }
      },
      legend: {
        text: {
          fill: "#333",
          fontSize: 14,
          fontWeight: 600
        }
      }
    },
    grid: {
      line: {
        stroke: "#eee",
        strokeWidth: 1
      }
    },
    legends: {
      text: {
        fill: "#333",
        fontSize: 14
      }
    },
    tooltip: {
      container: {
        background: "white",
        boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
        borderRadius: "4px",
        padding: "10px 14px",
        fontSize: "14px"
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>SNAP Data Analysis</h1>

      {loading ? (
        <p style={styles.loadingMessage}>Loading data...</p>
      ) : error ? (
        <p style={styles.errorMessage}>Error: {error}</p>
      ) : (
        <>
          <div style={styles.controlsContainer}>
            <div style={styles.selectGroup}>
              <label htmlFor="region-select" style={styles.label}>
                Select a Region:
              </label>
              <select
                id="region-select"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                style={styles.select}
              >
                <option value="">-- Select --</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {selectedRegion && (
              <button onClick={exportToCSV} style={styles.button}>
                Export to CSV
              </button>
            )}
          </div>

          {selectedRegion ? (
            <>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>County</th>
                    <th style={styles.th}>Month/Year</th>
                    <th style={styles.th}>Public Assistance (People)</th>
                    <th style={styles.th}>Non-Public Assistance (People)</th>
                    <th style={styles.th}>Total Issuance (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((d, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}>
                      <td style={styles.td}>{d.County}</td>
                      <td style={styles.td}>{new Date(d.Month_Year).toLocaleDateString()}</td>
                      <td style={styles.td}>{d.SNAP_All_Persons_Public_Assista?.toLocaleString() || 0}</td>
                      <td style={styles.td}>{d.SNAP_All_Persons_Non_Public_Ass?.toLocaleString() || 0}</td>
                      <td style={styles.td}>${d.SNAP_All_Total_Actual_PA___Non_?.toLocaleString() || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{...styles.chartContainer, height: "500px"}}>
                <h3 style={styles.chartTitle}>Participation Trends Over Time</h3>
                <ResponsiveLine
                  data={prepareLineData()}
                  margin={{ top: 50, right: 110, bottom: 70, left: 80 }}
                  xScale={{ type: "point" }}
                  yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
                  axisBottom={{
                    tickRotation: -45,
                    legend: "Date",
                    legendOffset: 50,
                    legendPosition: "middle"
                  }}
                  axisLeft={{
                    legend: "Count",
                    legendOffset: -60,
                    legendPosition: "middle"
                  }}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  enablePointLabel={true}
                  pointLabel="y"
                  pointLabelYOffset={-12}
                  useMesh={true}
                  theme={chartTheme}
                  legends={[
                    {
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: "left-to-right",
                      itemWidth: 80,
                      itemHeight: 20,
                      symbolSize: 12,
                    }
                  ]}
                />
              </div>

              <div style={{...styles.chartContainer, height: "400px"}}>
                <h3 style={styles.chartTitle}>Household Types by Month</h3>
                <ResponsiveBar
                  data={prepareBarData()}
                  keys={["PA", "NonPA"]}
                  indexBy="date"
                  margin={{ top: 50, right: 130, bottom: 70, left: 80 }}
                  padding={0.3}
                  groupMode="grouped"
                  colors={["#3498db", "#2ecc71"]}
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisBottom={{
                    tickRotation: -45,
                    legend: "Date",
                    legendPosition: "middle",
                    legendOffset: 50
                  }}
                  axisLeft={{
                    legend: "Number of Households",
                    legendPosition: "middle",
                    legendOffset: -60
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  legends={[
                    {
                      dataFrom: "keys",
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      symbolSize: 20,
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemOpacity: 1
                          }
                        }
                      ]
                    }
                  ]}
                  theme={chartTheme}
                />
              </div>

              <div style={{...styles.chartContainer, height: "400px"}}>
                <h3 style={styles.chartTitle}>Household Distribution (Latest Month)</h3>
                <ResponsivePie
                  data={preparePieData()}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={["#3498db", "#2ecc71"]}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  radialLabelsSkipAngle={10}
                  radialLabelsTextXOffset={6}
                  radialLabelsTextColor="#333333"
                  radialLabelsLinkOffset={0}
                  radialLabelsLinkDiagonalLength={16}
                  radialLabelsLinkHorizontalLength={24}
                  radialLabelsLinkStrokeWidth={1}
                  radialLabelsLinkColor={{ from: "color" }}
                  slicesLabelsSkipAngle={10}
                  slicesLabelsTextColor="#333333"
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  theme={chartTheme}
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "row",
                      translateY: 56,
                      itemWidth: 100,
                      itemHeight: 18,
                      symbolSize: 18,
                      symbolShape: "circle"
                    }
                  ]}
                />
              </div>
            </>
          ) : (
            <p style={styles.selectPrompt}>
              Please select a County to view data and graphs.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default DataTable;
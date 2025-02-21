import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const SNAPwv = () => {
  const [data, setData] = useState([]);
  const [summaryStats, setSummaryStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comparison, setComparison] = useState(null);

  const FEATURE_SERVICE_URL =
    "https://services1.arcgis.com/cTNi34MxOdcfum3A/arcgis/rest/services/SNAP_WV_FY15_Jan24/FeatureServer/0/query";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${FEATURE_SERVICE_URL}?where=1=1&outFields=County,SNAP_All_Households_Public_Assi,SNAP_All_Total_Actual_PA___Non_,Month_Year&f=json`
        );
        const result = await response.json();

        if (result.error) {
          throw new Error(result.error.message);
        }

        const features = result.features.map((feature) => feature.attributes);
        const sortedFeatures = features.sort(
          (a, b) => new Date(a.Month_Year) - new Date(b.Month_Year)
        );

        setData(sortedFeatures);
        calculateSummaryStats(sortedFeatures);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateSummaryStats = (features) => {
    const aggregated = features.reduce((acc, item) => {
      const year = new Date(item.Month_Year).getFullYear();
      if (!acc[year]) {
        acc[year] = {
          totalParticipation: 0,
          totalIssuance: 0,
        };
      }
      acc[year].totalParticipation += item.SNAP_All_Households_Public_Assi || 0;
      acc[year].totalIssuance += item.SNAP_All_Total_Actual_PA___Non_ || 0;
      return acc;
    }, {});

    const years = Object.keys(aggregated).sort((a, b) => a - b);
    const trends = years.map((year) => ({
      year: parseInt(year, 10),
      participation: aggregated[year].totalParticipation,
      issuance: aggregated[year].totalIssuance,
    }));

    const totalReductionParticipation =
      trends[0]?.participation - trends[trends.length - 1]?.participation || 0;
    const totalReductionIssuance =
      trends[0]?.issuance - trends[trends.length - 1]?.issuance || 0;

    const data2022 = trends.find((t) => t.year === 2022) || {};
    const data2023 = trends.find((t) => t.year === 2023) || {};

    setSummaryStats({
      trends,
      totalReductionParticipation,
      totalReductionIssuance,
    });

    setComparison({
      participationChange:
        data2023.participation && data2022.participation
          ? data2023.participation - data2022.participation
          : "Data not available",
      issuanceChange:
        data2023.issuance && data2022.issuance
          ? data2023.issuance - data2022.issuance
          : "Data not available",
    });
  };

  const prepareParticipationData = () => {
    if (!summaryStats || !summaryStats.trends) return [];
    return [
      {
        id: "Public Assistance Participation",
        data: summaryStats.trends.map((t) => ({
          x: t.year,
          y: t.participation,
        })),
      },
    ];
  };

  const prepareIssuanceData = () => {
    if (!summaryStats || !summaryStats.trends) return [];
    return [
      {
        id: "Issuance (USD)",
        data: summaryStats.trends.map((t) => ({
          x: t.year,
          y: t.issuance,
        })),
      },
    ];
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        SNAP Trends in West Virginia
      </h1>
      <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
        Explore how public assistance participation and issuance have evolved in
        West Virginia, especially after the COVID-19 pandemic.
      </p>

      {loading ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>Loading data...</p>
      ) : error ? (
        <p style={{ color: "red", textAlign: "center" }}>
          Error loading data: {error}
        </p>
      ) : (
        <>
          {summaryStats && comparison && (
            <>
              {/* Big Boxes */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "space-evenly",
                  marginBottom: "40px",
                }}
              >
                <div
                  style={{
                    flex: "1",
                    minWidth: "300px",
                    backgroundColor: "#fef2f2",
                    borderRadius: "8px",
                    padding: "20px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                  }}
                >
                  <PeopleIcon
                    style={{
                      fontSize: "50px",
                      color: "#333",
                      marginBottom: "10px",
                    }}
                  />
                  <h2 style={{ color: "#e53e3e" }}>2022 to 2023</h2>
                  <p style={{ fontSize: "18px", color: "#333" }}>
                    Households Lost Support
                  </p>
                  <p style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
                    {typeof comparison.participationChange === "string"
                      ? comparison.participationChange
                      : `${Math.abs(comparison.participationChange).toLocaleString()} households`}
                  </p>
                </div>

                <div
                  style={{
                    flex: "1",
                    minWidth: "300px",
                    backgroundColor: "#fef2f2",
                    borderRadius: "8px",
                    padding: "20px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                  }}
                >
                  <AttachMoneyIcon
                    style={{
                      fontSize: "50px",
                      color: "#333",
                      marginBottom: "10px",
                    }}
                  />
                  <h2 style={{ color: "#e53e3e" }}>2022 to 2023</h2>
                  <p style={{ fontSize: "18px", color: "#333" }}>
                    Funding Lost
                  </p>
                  <p style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
                    {typeof comparison.issuanceChange === "string"
                      ? comparison.issuanceChange
                      : `$${Math.abs(comparison.issuanceChange).toLocaleString()}`}
                  </p>
                </div>
              </div>

              {/* Charts */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                  style={{
                    flex: "1",
                    minWidth: "300px",
                    backgroundColor: "#f1f8ff",
                    borderRadius: "8px",
                    padding: "20px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Public Assistance Participation
                  </h2>
                  <div style={{ height: "400px" }}>
                    <ResponsiveLine
                      data={prepareParticipationData()}
                      margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                      axisBottom={{
                        legend: "Year",
                        legendPosition: "middle",
                        legendOffset: 40,
                      }}
                      axisLeft={{
                        legend: "Households",
                        legendPosition: "middle",
                        legendOffset: -50,
                      }}
                      pointSize={10}
                      pointBorderWidth={2}
                      useMesh={true}
                      colors={{ scheme: "category10" }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    flex: "1",
                    minWidth: "300px",
                    backgroundColor: "#fef7e7",
                    borderRadius: "8px",
                    padding: "20px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Total Issuance (USD)
                  </h2>
                  <div style={{ height: "400px" }}>
                    <ResponsiveLine
                      data={prepareIssuanceData()}
                      margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                      axisBottom={{
                        legend: "Year",
                        legendPosition: "middle",
                        legendOffset: 40,
                      }}
                      axisLeft={{
                        legend: "USD",
                        legendPosition: "middle",
                        legendOffset: -50,
                      }}
                      pointSize={10}
                      pointBorderWidth={2}
                      useMesh={true}
                      colors={{ scheme: "set2" }}
                    />
                  </div>
                </div>
              </div>

              {/* Why Section */}
              <div
                style={{
                  backgroundColor: "#e9f5f2",
                  borderRadius: "8px",
                  padding: "20px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  marginTop: "20px",
                }}
              >
                <h3 style={{ color: "#004d40" }}>Why the Changes?</h3>
                <p style={{ fontSize: "16px", color: "#004d40" }}>
                  The expiration of COVID-19-related SNAP flexibilities in May
                  2023 resulted in stricter eligibility and reporting requirements.
                  Emergency allotments, which provided extra benefits during the
                  pandemic, ended in February 2023, leading to a sharp decline in
                  participation and issuance levels.
                </p>
                <p style={{ fontSize: "16px", color: "#004d40" }}>
                  These changes underscore the need for robust support to address
                  food insecurity in West Virginia.
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SNAPwv;

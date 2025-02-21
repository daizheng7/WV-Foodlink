import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";

const FEATURE_SERVICE_URL =
  "https://services1.arcgis.com/cTNi34MxOdcfum3A/arcgis/rest/services/SNAP_WV_FY15_Jan24/FeatureServer/0/query";

const PAGE_SIZE = 12; // Number of counties per page

const RankingCounties = () => {
  const [data, setData] = useState([]);
  const [participationTrends, setParticipationTrends] = useState([]);
  const [fundingTrends, setFundingTrends] = useState([]);
  const [statewideTotals, setStatewideTotals] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `${FEATURE_SERVICE_URL}?where=1=1&outFields=County,Calc__SNAP_Total_PA_and_Non_PA_,SNAP_All_Total_Actual_PA___Non_,Month_Year&f=json`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.error) {
          throw new Error(result.error.message);
        }

        const features = result.features
          .map((feature) => feature.attributes)
          .filter(
            (item) =>
              item.County !== "COMM WV DEPT OF H & H R" &&
              item.County !== "COMM W VA DEPT HUMN SV" &&
              item.County !== "BROOKE " // Remove BROOKE
          );

        const sortedFeatures = features.sort(
          (a, b) => new Date(a.Month_Year) - new Date(b.Month_Year)
        );

        setData(sortedFeatures);
        calculateStatewideTotals(sortedFeatures);
        calculateParticipationTrends(sortedFeatures);
        calculateFundingTrends(sortedFeatures);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateStatewideTotals = (features) => {
    const totals = features.reduce(
      (acc, item) => ({
        participation: acc.participation + (item.Calc__SNAP_Total_PA_and_Non_PA_ || 0),
        issuance: acc.issuance + (item.SNAP_All_Total_Actual_PA___Non_ || 0),
      }),
      { participation: 0, issuance: 0 }
    );
    setStatewideTotals(totals);
  };

  const calculateParticipationTrends = (features) => {
    const groupedData = features.reduce((acc, item) => {
      if (!acc[item.County]) acc[item.County] = [];
      acc[item.County].push(item);
      return acc;
    }, {});

    const trends = Object.entries(groupedData).map(([county, records]) => {
      const participationStart = records[0]?.Calc__SNAP_Total_PA_and_Non_PA_ || 0;
      const participationEnd =
        records[records.length - 1]?.Calc__SNAP_Total_PA_and_Non_PA_ || 0;
      const trend =
        ((participationEnd - participationStart) / participationStart) * 100;

      return {
        county,
        trend: trend.toFixed(2),
        participationStart,
        participationEnd,
      };
    });

    setParticipationTrends(trends);
  };

  const calculateFundingTrends = (features) => {
    const groupedData = features.reduce((acc, item) => {
      if (!acc[item.County]) acc[item.County] = [];
      acc[item.County].push(item);
      return acc;
    }, {});

    const trends = Object.entries(groupedData).map(([county, records]) => {
      const fundingStart = records[0]?.SNAP_All_Total_Actual_PA___Non_ || 0;
      const fundingEnd =
        records[records.length - 1]?.SNAP_All_Total_Actual_PA___Non_ || 0;
      const trend =
        ((fundingEnd - fundingStart) / fundingStart) * 100;

      return {
        county,
        trend: trend.toFixed(2),
        fundingStart,
        fundingEnd,
      };
    });

    setFundingTrends(trends);
  };

  const mergeAndSortTrends = () => {
    const mergedTrends = participationTrends
      .filter((item) => item.county !== "BROOKE") // Explicitly exclude BROOKE
      .map((participation) => {
        const funding = fundingTrends.find(
          (fund) => fund.county === participation.county
        );
  
        return {
          county: participation.county,
          participationTrend: parseFloat(participation.trend),
          fundingTrend: funding ? parseFloat(funding.trend) : null,
        };
      });
  
    return mergedTrends.sort((a, b) => a.participationTrend - b.participationTrend);
  };


  const prepareCombinedChartData = () => {
    const sortedData = mergeAndSortTrends();
    const startIndex = currentPage * PAGE_SIZE;
    return sortedData.slice(startIndex, startIndex + PAGE_SIZE).map((item) => ({
      county: item.county, // Remove truncation logic
      participationTrend: item.participationTrend,
      fundingTrend: item.fundingTrend,
    }));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (participationTrends.length === 0 || fundingTrends.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h2>Combined Participation and Funding Trends</h2>
      <div style={{ height: "400px", marginBottom: "40px" }}>
        <ResponsiveBar
          data={prepareCombinedChartData()}
          keys={["participationTrend", "fundingTrend"]}
          indexBy="county"
          margin={{ top: 50, right: 130, bottom: 100, left: 60 }}
          padding={0.3}
          groupMode="grouped"
          colors={{ scheme: "nivo" }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 10,
            tickRotation: -30,
            legend: "County",
            legendPosition: "middle",
            legendOffset: 80,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Trend (%)",
            legendPosition: "middle",
            legendOffset: -40,
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
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
            },
          ]}
        />
      </div>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * PAGE_SIZE >= participationTrends.length}
        >
          Next
        </button>
      </div>
      {statewideTotals && (
        <div>
          <h3>Statewide Totals</h3>
          <p>
            Total Participation: {statewideTotals.participation.toLocaleString()}
          </p>
          <p>Total Issuance: ${statewideTotals.issuance.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default RankingCounties;

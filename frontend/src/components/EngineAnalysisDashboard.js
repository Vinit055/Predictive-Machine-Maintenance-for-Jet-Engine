import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import HeatMap from "react-heatmap-grid"; // Import Heatmap Grid
import { Link, useNavigate } from "react-router-dom";

const EngineAnalysisDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sensorData, setSensorData] = useState([]);
  const [sensorStats, setSensorStats] = useState([]);
  const [predictedVsActual, setPredictedVsActual] = useState([]);
  const [correlationData, setCorrelationData] = useState([]);

  // Fetch and process data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/performance/1");
        const data = await response.json();
        console.log("Raw data:", data);

        if (data.performance_data) {
          setSensorData(data.performance_data);
          processData(data.performance_data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processData = (data) => {
    const stats = calculateSensorStats(data);
    setSensorStats(stats);

    const predictions = data.map((row) => ({
      actual: row.RUL || 0,
      predicted: row.predicted_RUL || 0,
    }));
    setPredictedVsActual(predictions);

    const correlations = calculateCorrelations(data);
    setCorrelationData(correlations);
  };

  const calculateSensorStats = (data) => {
    const sensorStats = [];
    const sensorColumns = Array.from(
      { length: 21 },
      (_, i) => `sensor_${i + 1}`
    );

    sensorColumns.forEach((sensor) => {
      const values = data
        .map((row) => row[sensor])
        .filter((val) => val !== undefined);
      if (values.length > 0) {
        const sorted = [...values].sort((a, b) => a - b);
        sensorStats.push({
          name: sensor,
          min: sorted[0],
          q1: sorted[Math.floor(values.length * 0.25)],
          median: sorted[Math.floor(values.length * 0.5)],
          q3: sorted[Math.floor(values.length * 0.75)],
          max: sorted[sorted.length - 1],
        });
      }
    });

    return sensorStats;
  };

  const calculateCorrelations = (data) => {
    const sensorColumns = Array.from(
      { length: 21 },
      (_, i) => `sensor_${i + 1}`
    );
    const correlations = [];
    const matrix = [];

    sensorColumns.forEach((sensor1, i) => {
      const values1 = data.map((row) => row[sensor1]);
      const row = sensorColumns.map((sensor2) => {
        const values2 = data.map((row) => row[sensor2]);
        return calculatePearsonCorrelation(values1, values2);
      });
      matrix.push(row);
    });

    return matrix;
  };

  const calculatePearsonCorrelation = (x, y) => {
    const n = x.length;
    const sum_x = x.reduce((a, b) => a + b, 0);
    const sum_y = y.reduce((a, b) => a + b, 0);
    const sum_xy = x.reduce((acc, curr, i) => acc + curr * y[i], 0);
    const sum_x2 = x.reduce((acc, curr) => acc + curr * curr, 0);
    const sum_y2 = y.reduce((acc, curr) => acc + curr * curr, 0);

    const correlation =
      (n * sum_xy - sum_x * sum_y) /
      Math.sqrt((n * sum_x2 - sum_x * sum_x) * (n * sum_y2 - sum_y * sum_y));

    return isNaN(correlation) ? 0 : correlation;
  };

  if (loading) {
    return <div className="p-4">Loading data...</div>;
  }

  const sensorColumns = Array.from({ length: 21 }, (_, i) => `sensor_${i + 1}`);

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        // Navigate to home page
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <nav className="bg-navy-700 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Reports</h1>
          <ul className="flex space-x-4">
            <li>
              <Link to="/dashboard" className="hover:text-gray-300 text-lg">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/calendar" className="hover:text-gray-300 text-lg">
                Calendar
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-gray-300 text-lg"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sensor Correlation Matrix */}
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h2 className="text-xl font-bold mb-4">Sensor Correlation Matrix</h2>
        <div className="relative">
          <div className="h-72 overflow-auto">
            {correlationData.length > 0 && (
              <div className="relative">
                {/* Sticky column for y-axis labels
          <div className="absolute left-0 top-0 bg-white z-10">
            {sensorColumns.map((label) => (
              <div
                key={`y-${label}`}
                className="h-[25px] flex items-center px-2 border-b border-r border-gray-200 bg-white"
                style={{ width: '75px' }}
              >
                {label}
              </div>
            ))}
          </div> */}

                {/* Main heatmap with offset */}
                <div className="mx-[35px]">
                  <HeatMap
                    xLabels={sensorColumns}
                    yLabels={sensorColumns}
                    data={correlationData}
                    xLabelsLocation="top"
                    xLabelWidth={50}
                    yLabelWidth={75}
                    height={25}
                    square
                    cellStyle={(background, value, min, max) => ({
                      background: `rgba(0, 151, 255, ${
                        1 - (max - value) / (max - min)
                      })`,
                      fontSize: "11px",
                    })}
                    cellRender={(value) => value && value.toFixed(2)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Predicted vs Actual RUL */}
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h2 className="text-xl font-bold mb-4">Predicted vs Actual RUL</h2>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 30 }}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="actual"
              name="Actual RUL"
              label={{
                value: "Actual RUL",
                position: "bottom",
                offset: 10, // Increased offset for more space
              }}
            />
            <YAxis
              type="number"
              dataKey="predicted"
              name="Predicted RUL"
              label={{
                value: "Predicted RUL",
                angle: -90,
                position: "insideLeft",
                offset: 10, // Adjusted for spacing on the left
              }}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter
              name="RUL"
              data={predictedVsActual}
              fill="#8884d8"
              legendType="circle"
              dot={{ r: 5 }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ paddingBottom: 20 }} // Adds padding to separate the legend and axis
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Box Plot for Sensor Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Sensor Statistics Box Plot</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={sensorStats}>
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="min" stroke="#8884d8" />
            <Line type="monotone" dataKey="q1" stroke="#82ca9d" />
            <Line type="monotone" dataKey="median" stroke="#ffc658" />
            <Line type="monotone" dataKey="q3" stroke="#ff7300" />
            <Line type="monotone" dataKey="max" stroke="#d0ed57" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EngineAnalysisDashboard;

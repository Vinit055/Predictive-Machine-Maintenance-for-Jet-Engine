// EnginePerformance.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const EnginePerformance = () => {
  const [engineId, setEngineId] = useState(1); // Default engine ID
  const [performanceData, setPerformanceData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [sensorReadings, setSensorReadings] = useState({});

  useEffect(() => {
    // Fetch engine performance data when engineId changes
    if (engineId) {
      axios
        .get(`/performance/${engineId}`)
        .then((response) => {
          const data = response.data.performance_data;

          if (data) {
            // Extracting labels (time or sequence) and sensor values
            const timeLabels = data.map((item, index) => `T-${index}`);
            const sensors = {};
            // Assume sensor columns are named 'sensor_1', 'sensor_2', ..., 'sensor_21'
            for (let i = 1; i <= 21; i++) {
              sensors[`Sensor ${i}`] = data.map((item) => item[`sensor_${i}`]);
            }

            setLabels(timeLabels);
            setSensorReadings(sensors);
          }
        })
        .catch((error) => {
          console.error("Error fetching performance data:", error);
        });
    }
  }, [engineId]);

  const handleEngineChange = (e) => {
    setEngineId(e.target.value);
  };

  // Create chart data for Line graph
  const chartData = {
    labels: labels,
    datasets: Object.keys(sensorReadings).map((sensorName, index) => ({
      label: sensorName,
      data: sensorReadings[sensorName],
      fill: false,
      borderColor: `hsl(${(index * 30) % 360}, 70%, 50%)`,
      tension: 0.1,
    })),
  };

  return (
    <div>
      <h2>Engine Performance Analysis</h2>
      <label htmlFor="engineSelect">Select Engine ID:</label>
      <select id="engineSelect" onChange={handleEngineChange} value={engineId}>
        {/* Dynamically generate engine options or provide a fixed range */}
        {[1, 2, 3, 4, 5].map((id) => (
          <option key={id} value={id}>
            Engine {id}
          </option>
        ))}
      </select>

      <div style={{ width: "80%", margin: "0 auto" }}>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default EnginePerformance;

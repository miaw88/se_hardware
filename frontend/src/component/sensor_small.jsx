import { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Box,
  Typography,
  CardContent,
  Card,
  CardActions,
  Button,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import Battery_sensor from "../chart/sensor_small/battery";
import Voltage_sensor from "../chart/sensor_small/voltage";
import Linkquality_sensor from "../chart/sensor_small/slinkquality";
import Sensor_TH from "../chart/sensor_small/tem_hum_small";
import { useFilter } from "../store/useFilter";

function Sensor_small({ dataSensor, setDataSensor, hasData }) {
  // const [data_sensor, setData_sensor] = useState([]);
  // const [hasData, setHasData] = useState(true); // New state for tracking data presence
  const [resetCount, setResetCount] = useState(0);
  const { startDate, endDate } = useFilter();

  const GetData_sensor = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sensor");
      setDataSensor(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetData_sensor();
  }, [startDate, endDate]); // Fetch data only once when the component mounts

  return (
    <>
      <div
        className="relative card card-compact bg-base-100 shadow-lg rounded-md border"
        style={{ margin: "20px" }}
      >
        <div className="card-body flex flex-row justify-between">
          <Card
            style={{ width: "100%", height: "80vh", backgroundColor: "white" }}
          >
            <h4
              className="text-xl font-bold text-gray-700"
              style={{ marginLeft: "20px", marginTop: "20px", color: "black" }}
            >
              Temp & Humid
            </h4>
            <CardContent style={{ height: "100%" }}>
              <div style={{ height: "80%" }}>
                <div style={{ height: "100%" }}>
                  {hasData ? (
                    <Sensor_TH
                      data={dataSensor}
                      style={{ height: "100%", width: "100%" }}
                    />
                  ) : (
                    <div style={{ marginTop: "10px", color: "red" }}>
                      No data found for the selected date range.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div
        className="relative card card-compact bg-base-100 shadow-lg rounded-md border"
        style={{ margin: "20px" }}
      >
        <div className="card-body flex flex-row justify-between">
          <Card style={{ width: 600, height: 400, backgroundColor: "white" }}>
            <h4
              className="text-xl font-bold text-gray-700"
              style={{ marginLeft: "20px", marginTop: "20px", color: "black" }}
            >
              Voltage
            </h4>
            <CardContent>
              <div style={{ height: "100%" }}>
                <div style={{ height: "100%" }}>
                  {hasData ? (
                    <Voltage_sensor
                      data={dataSensor}
                      key={resetCount}
                      style={{ height: "100%" }}
                    />
                  ) : (
                    <div style={{ marginTop: "10px", color: "red" }}>
                      No data found for the selected date range.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card style={{ width: 600, height: 400, backgroundColor: "white" }}>
            <h4
              className="text-xl font-bold text-gray-700"
              style={{ marginLeft: "20px", marginTop: "20px", color: "black" }}
            >
              Linkquality
            </h4>
            <CardContent>
              <div style={{ height: "100%" }}>
                <div style={{ height: "100%" }}>
                  {hasData ? (
                    // Pass resetCount as a key to force re-render when it changes
                    <Linkquality_sensor
                      data={dataSensor}
                      key={resetCount}
                      style={{ height: "100%" }}
                    />
                  ) : (
                    <div style={{ marginTop: "10px", color: "red" }}>
                      No data found for the selected date range.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card style={{ width: 600, height: 400, backgroundColor: "white" }}>
            <h4
              className="text-xl font-bold text-gray-700"
              style={{ marginLeft: "20px", marginTop: "20px", color: "black" }}
            >
              Battery
            </h4>
            <CardContent>
              <div style={{ height: "100%" }}>
                <div style={{ height: "100%" }}>
                  {hasData ? (
                    // Pass resetCount as a key to force re-render when it changes
                    <Battery_sensor
                      data={dataSensor}
                      key={resetCount}
                      style={{ height: "100%" }}
                    />
                  ) : (
                    <div style={{ marginTop: "10px", color: "red" }}>
                      No data found for the selected date range.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Sensor_small;

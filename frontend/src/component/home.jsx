import { useState, useEffect } from "react";
import axios from "axios";
import { blue, red, grey, yellow } from "@mui/material/colors";
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
import "react-datepicker/dist/react-datepicker.css";
import ChartSensor from "../chart/smart_air/tem_hum_smart_air";
import Co2_smart from "../chart/smart_air/co2";
import Voc_smart from "../chart/smart_air/voc";
import Linkquality_smart from "../chart/smart_air/linkquality";
import Formaldehyde_smart from "../chart/smart_air/formaldehyde";
import Pm25_smart from "../chart/smart_air/pm25";
import Sensor_TH from "../chart/sensor_small/tem_hum_small";
import Battery_sensor from "../chart/sensor_small/battery";
import Voltage_sensor from "../chart/sensor_small/voltage";
import Linkquality_sensor from "../chart/sensor_small/slinkquality";
import Api_weather from "./API_weather";
import { useFilter } from "../store/useFilter";
import Sensor_all from "../chart/home_page/sensor_all";
import Smart_all from "../chart/home_page/smar_air_all";

function Home({ dataSmart, setDataSmart, hasData, dataSensor, setDataSensor }) {
  const [resetCount, setResetCount] = useState(0);
  const [dataSmart_Air, setDataSmart_Air] = useState([]);

  const GetData_smart = async () => {
    try {
      const response = await axios.get("http://localhost:8080/smart_air");
      setDataSmart_Air(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const GetData_sensor = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sensor");
      setDataSensor(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { startDate, endDate } = useFilter();
  const [selectedTimeRange, setSelectedTimeRange] = useState("now"); // Default to 'now'

  useEffect(() => {
    GetData_smart();
    GetData_sensor();
  }, [startDate, endDate]); // Fetch data only once when the component mounts

  return (
    <>
      <div
        className="relative card card-compact bg-base-100 shadow-lg rounded-md border"
        style={{ margin: "20px" }}
      >
        <h4
          className="text-xl font-bold text-gray-700"
          style={{ marginLeft: "20px", marginTop: "20px", color: "black" }}
        >
          Smart Air
        </h4>
        {/* Existing code */}
        <div className="card-body flex flex-row justify-between">
          <Card
            style={{ width: "100%", height: "100vh", backgroundColor: "white" }}
          >
            <CardContent style={{ height: "100%" }}>
              <div style={{ height: "80%" }}>
                <div style={{ height: "100%" }}>
                  {hasData ? (
                    <Smart_all
                      data={dataSmart_Air}
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

      {/* Add a similar block for the Sensor data */}
      <div
        className="relative card card-compact bg-base-100 shadow-lg rounded-md border"
        style={{ margin: "20px" }}
      >
        <h4
          className="text-xl font-bold text-gray-700"
          style={{ marginLeft: "20px", marginTop: "20px", color: "black" }}
        >
          Small Sensor
        </h4>
        <div className="card-body flex flex-row justify-between">
          <Card
            style={{ width: "100%", height: "100vh", backgroundColor: "white" }}
          >
            <CardContent style={{ height: "100%" }}>
              <div style={{ height: "80%" }}>
                <div style={{ height: "100%" }}>
                  {hasData ? (
                    <Sensor_all
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
      {/* ----------------------------------------------------------------------------------------- */}

      {/* ----------------------------------------------------------------------------------------- */}
      <Api_weather></Api_weather>
    </>
  );
}

export default Home;

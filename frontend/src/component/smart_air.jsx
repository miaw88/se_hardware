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
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import ChartSensor from "../chart/smart_air/tem_hum_smart_air";
import Co2_smart from "../chart/smart_air/co2";
import Voc_smart from "../chart/smart_air/voc";
import Linkquality_smart from "../chart/smart_air/linkquality";
import Formaldehyde_smart from "../chart/smart_air/formaldehyde";
import Pm25_smart from "../chart/smart_air/pm25";
import { useFilter } from "../store/useFilter";

function Smart_air({ dataSmart, setDataSmart, hasData }) {
  //   const [data_smart, setData_smart] = useState([]);
  //   const [hasData, setHasData] = useState(true); // New state for tracking data presence
  const [resetCount, setResetCount] = useState(0);

  const GetData_smart = async () => {
    try {
      const response = await axios.get("http://localhost:8080/smart_air");
      setDataSmart(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { startDate, endDate } = useFilter();
  const [selectedTimeRange, setSelectedTimeRange] = useState("now"); // Default to 'now'

  useEffect(() => {
    GetData_smart();
  }, [startDate, endDate]); // Fetch data only once when the component mounts

  return (
    <>
      <div
        className="relative card card-compact bg-base-100 shadow-lg rounded-md border"
        style={{ margin: "20px" }}
      >
        <div className="card-body flex flex-row justify-between">
          <Card
            style={{ width: "100%", height: "100vh", backgroundColor: "white" }}
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
                    <ChartSensor
                      data={dataSmart}
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
              CO2
            </h4>
            <CardContent>
              <div style={{ height: "100%" }}>
                <div style={{ height: "100%" }}>
                  {hasData ? (
                    // Pass resetCount as a key to force re-render when it changes
                    <Co2_smart
                      data={dataSmart}
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
              VOC
            </h4>
            <CardContent>
              <div style={{ height: "100%" }}>
                <div style={{ height: "100%" }}>
                  {hasData ? (
                    // Pass resetCount as a key to force re-render when it changes
                    <Voc_smart
                      data={dataSmart}
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
                    <Linkquality_smart
                      data={dataSmart}
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
              Formaldehyde
            </h4>
            <CardContent>
              <div style={{ height: "100%" }}>
                <div style={{ height: "100%" }}>
                  {hasData ? (
                    <Formaldehyde_smart
                      data={dataSmart}
                      key={resetCount}
                      timeRange={selectedTimeRange}
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
              PM 2.5
            </h4>
            <CardContent>
              <div style={{ height: "100%" }}>
                <div style={{ height: "100%" }}>
                  {hasData ? (
                    // Pass resetCount as a key to force re-render when it changes
                    <Pm25_smart
                      data={dataSmart}
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

export default Smart_air;

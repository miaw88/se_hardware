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
import "./API_weather.css";
// import keys from "./keys";
const API_KEY = "9859bb8cfe0bbb6378faea5062e7d625";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const api = {
  key: API_KEY,
  base: BASE_URL,
};

function Api_weather() {
  const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };

  return (
    <>
      {/* ----------------------------------------------------------------------------------------- */}
      <main>
        <div
          className="relative card card-compact bg-base-100 shadow-lg rounded-md border"
          style={{ margin: "20px" }}
        >
          <h4
            className="text-xl font-bold text-gray-700"
            style={{ marginLeft: "20px", marginTop: "20px", color: "black" }}
          >
            API
          </h4>
          <div
            className={
              typeof weather.main != "undefined"
                ? weather.main.temp > 18
                  ? "App hot"
                  : "App cold"
                : "App"
            }
          >
            <main>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-bar"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  onKeyPress={search}
                />
              </div>
              {typeof weather.main != "undefined" ? (
                <div>
                  <div className="location-container">
                    <div className="location">
                      {weather.name}, {weather.sys.country}
                    </div>
                    <div className="date"> {dateBuild(new Date())}</div>
                  </div>
                  <div className="weather-container">
                    <div className="temperature">
                      {Math.round(weather.main.temp)}°C
                    </div>
                    <div className="weather">{weather.weather[0].main}</div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </main>
          </div>
        </div>
      </main>
    </>
  );
}

export default Api_weather;

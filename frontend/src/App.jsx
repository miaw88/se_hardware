import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/home";
import Smart_air from "./component/smart_air";
import Sensor_small from "./component/sensor_small";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCloud,
  faTemperatureEmpty,
} from "@fortawesome/free-solid-svg-icons";
import FilterDate from "./component/FilterDate";
import { useFilter } from "./store/useFilter";

function App() {
  const { startDate, endDate } = useFilter();
  const [data, setData] = useState([]);
  const [dataSmart_Air, setDataSmart_Air] = useState([]);
  const [hasData, setHasData] = useState(true); // New state for tracking data presence
  // console.log(window.location.pathname)

  const handleButtonClick = () => {
    const currentPath = window.location.pathname;
    const requestData = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  
    fetch(`http://localhost:8080${currentPath}/set-date`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((resultData) => {
        if (resultData.data.rows && resultData.data.rows.length > 0) {
          if (currentPath === "/smart_air") {
            // If the current path is "/smart_air", set dataSmart
            setDataSmart(resultData.data.rows);
          } else if (currentPath === "/sensor_small") {
            // If the current path is "/sensor_small", set dataSensor
            setDataSensor(resultData.data.rows);
          }
  
          setHasData(true);
        } else {
          setHasData(false);
        }
      });
  };
  

  return (
    <>
      <nav
        className="navbar navbar-expand-md navbar-dark flex justify-between"
        style={{ backgroundColor: "#053B50" }}
      >
        <div className="flex">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a href="/" className="navbar-brand btn ">
            <FontAwesomeIcon icon={faHome} /> Home
          </a>
          <a
            href="/smart_air"
            className="nav-link btn"
            style={{ color: "white" }}
          >
            <FontAwesomeIcon icon={faCloud} />
            Smart Air
          </a>
          <a
            href="/sensor_small"
            className="nav-link btn"
            style={{ color: "white" }}
          >
            <FontAwesomeIcon icon={faTemperatureEmpty} />
            Sensor
          </a>
        </div>
        <div>
          <FilterDate handleButtonClick={handleButtonClick} />
        </div>
      </nav>
      <div style={{ backgroundColor: "#64CCC5 ", paddingTop: "20px" }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  dataSmart={data}
                  setDataSmart={setData}
                  hasData={hasData}
                  dataSensor={data}
                  setDataSensor={setData}
                />
              }
            />
            {/* <Route path="/" element={<Home />} /> */}
            <Route
              path="/smart_air"
              element={
                <Smart_air
                  dataSmart={data}
                  setDataSmart={setData}
                  hasData={hasData}
                />
              }
            />
            <Route
              path="/sensor_small"
              element={
                <Sensor_small
                  dataSensor={data}
                  setDataSensor={setData}
                  hasData={hasData}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

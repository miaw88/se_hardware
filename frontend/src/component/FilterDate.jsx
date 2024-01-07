import { useEffect, useState } from "react";
import axios from "axios";
import { CardContent, Card } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import ChartSensor from "../chart/smart_air/tem_hum_smart_air";
import { useFilter } from "../store/useFilter";

const FilterDate = ({handleButtonClick}) => {
  const { startDate, endDate, setStartDate, setEndDate } = useFilter();

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="dd MMM HH:mm"
        showIcon
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="dd MMM HH:mm"
        showIcon
      />
      <button className="ml-4" onClick={() => handleButtonClick()}>
        <FontAwesomeIcon icon={faSearch} color="#fff" size={"xl"} />
      </button>
</>
  );
};

export default FilterDate;

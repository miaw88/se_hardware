
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { blue, red, grey, yellow } from "@mui/material/colors";
// import { Paper, Box, Typography, CardContent, Card, CardActions, Button } from '@mui/material';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faRotateRight } from '@fortawesome/free-solid-svg-icons';
// import { faCalendar } from '@fortawesome/free-solid-svg-icons';
// import 'react-datepicker/dist/react-datepicker.css';
// import ChartSensor from '../chart/smart_air/tem_hum_smart_air';
// import Co2_smart from '../chart/smart_air/co2';
// import Voc_smart from '../chart/smart_air/voc';
// import Linkquality_smart from '../chart/smart_air/linkquality';
// import Formaldehyde_smart from '../chart/smart_air/formaldehyde';
// import Pm25_smart from '../chart/smart_air/pm25';
// import Sensor_TH from '../chart/sensor_small/tem_hum_small';
// import Battery_sensor from '../chart/sensor_small/battery';
// import Voltage_sensor from '../chart/sensor_small/voltage';
// import Linkquality_sensor from '../chart/sensor_small/slinkquality';


// function HomeTest() {
//     const [data_smart, setData_smart] = useState([]);
//     const [data_sensor, setData_sensor] = useState([]);

//     const [hasData, setHasData] = useState(true); // New state for tracking data presence
//     const [resetCount, setResetCount] = useState(0);

//     const GetData_smart = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/smart_air');
//             setData_smart(response.data);
//             console.log(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };
//     const GetData_sensor = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/sensor');
//             setData_sensor(response.data);
//             console.log(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());
//     const [selectedTimeRange, setSelectedTimeRange] = useState('now'); // Default to 'now'

//     const handleTimeRangeChange = (event) => {
//         const selectedRange = event.target.value;
//         setSelectedTimeRange(selectedRange);
//     };

//     const handleStartDateChange = (date) => {
//         setStartDate(date);
//     };

//     const handleEndDateChange = (date) => {
//         setEndDate(date);
//         // Trigger search when endDate changes
//         handleButtonClick();
//     };
//     const handleButtonResetClick = () => {
//         // Fetch data again when reset button is clicked
//         GetData_smart();
//         // Increment the resetCount to force re-render
//         setResetCount(resetCount + 1);
//     };

//     const handleButtonClick = () => {
//         // เตรียมข้อมูลที่จะส่งไปยัง API
//         const requestData = {
//             startDate: startDate.toISOString(), // แปลงวันที่เป็น ISO string
//             endDate: endDate.toISOString(),
//         };
//         console.log(startDate, endDate);
//         // ทำการเรียก API โดยใช้ fetch หรือ axios
//         fetch('http://localhost:8080/smart_air/set-date', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(requestData),
//         })
//             .then(response => response.json())
//             .then(resultData => {
//                 if (resultData.data.rows.length > 0) {
//                     setData_smart(resultData.data.rows);
//                     setHasData(true); // Set the state to indicate data is present
//                 } else {
//                     setHasData(false); // Set the state to indicate no data
//                 }
//             })
//     };



//     useEffect(() => {
//         GetData_smart();
//         GetData_sensor();
//     }, [startDate, endDate]); // Fetch data only once when the component mounts

//     return (
//         <>
//             <div class="relative card card-compact bg-base-100 shadow-lg rounded-md border" style={{ backgroundColor:'#EEEEEE',margin: '20px' }}>
//                 <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black' }}>Smart Air</h4>
//                 <div class="card-body flex flex-row justify-between">
//                     <Card style={{ width: '100%', height: '100vh', backgroundColor: 'white' }}>
//                         <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black' }}>Temp & Humid</h4>
//                         <CardContent style={{ height: '100%' }}>
//                             <div style={{ height: '80%' }}>
//                                 {/* Adjust the height percentage as needed */}
//                                 <div style={{ height: '100%' }}>
//                                     <DatePicker
//                                         selected={startDate}
//                                         onChange={handleStartDateChange}
//                                         selectsStart
//                                         startDate={startDate}
//                                         endDate={endDate}
//                                         showTimeSelect
//                                         timeFormat="HH:mm"
//                                         timeIntervals={15}
//                                         dateFormat="dd MMM HH:mm"
//                                         showIcon
//                                     />
//                                     <DatePicker
//                                         selected={endDate}
//                                         onChange={handleEndDateChange}
//                                         selectsEnd
//                                         startDate={startDate}
//                                         endDate={endDate}
//                                         minDate={startDate}
//                                         showTimeSelect
//                                         timeFormat="HH:mm"
//                                         timeIntervals={15}
//                                         dateFormat="dd MMM HH:mm"
//                                         showIcon
//                                     />
//                                     <button onClick={() => handleButtonClick()}>
//                                         <FontAwesomeIcon icon={faSearch} />
//                                     </button>
//                                     {hasData ? (
//                                         <ChartSensor data={data_smart} style={{ height: '100%', width: '100%' }} />
//                                     ) : (
//                                         <div style={{ marginTop: '10px', color: 'red' }}>
//                                             No data found for the selected date range.
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                     <Card style={{ width: '100%', height: '100vh', backgroundColor: 'white' }}>
//                         <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black' }}>API RADAR</h4>
//                         <CardContent style={{ height: '100%' }}>
//                             <div style={{ height: '80%' }}>
//                                 {/* Adjust the height percentage as needed */}
//                                 <div style={{ height: '100%' }}>

//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div >
//                 <div class="card-body flex flex-row justify-between">
//                     <Card style={{ width: 600, height: 400, backgroundColor: "white", marginLeft: '20px'  }}>
//                         <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black'}}>CO2</h4>
//                         <CardContent>
//                             <div style={{ height: '100%' }}>
//                                 <div style={{ height: '100%' }}>
//                                     <button onClick={handleButtonResetClick}>
//                                         <FontAwesomeIcon icon={faRotateRight} />
//                                     </button>
//                                     {hasData ? (
//                                         // Pass resetCount as a key to force re-render when it changes
//                                         <Co2_smart data={data_smart} key={resetCount} style={{ height: '100%' }} />
//                                     ) : (
//                                         <div style={{ marginTop: '10px', color: 'red' }}>
//                                             No data found for the selected date range.
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                     <Card style={{ width: 600, height: 400, backgroundColor: "white" }}>
//                         <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black' }}>VOC</h4>
//                         <CardContent>
//                             <div style={{ height: '100%' }}>
//                                 <div style={{ height: '100%' }}>
//                                     {/* <button onClick={handleButtonResetClick}>
//                                         <FontAwesomeIcon icon={faRotateRight} />
//                                     </button> */}
//                                     {hasData ? (
//                                         // Pass resetCount as a key to force re-render when it changes
//                                         <Voc_smart data={data_smart} key={resetCount} style={{ height: '100%' }} />
//                                     ) : (
//                                         <div style={{ marginTop: '10px', color: 'red' }}>
//                                             No data found for the selected date range.
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                     <Card style={{ width: 600, height: 400, backgroundColor: "white" }}>
//                         <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black' }}>Linkquality</h4>
//                         <CardContent>
//                             <div style={{ height: '100%' }}>
//                                 <div style={{ height: '100%' }}>
//                                     {/* <button onClick={handleButtonResetClick}>
//                                         <FontAwesomeIcon icon={faRotateRight} />
//                                     </button> */}
//                                     {hasData ? (
//                                         // Pass resetCount as a key to force re-render when it changes
//                                         <Linkquality_smart data={data_smart} key={resetCount} style={{ height: '100%' }} />
//                                     ) : (
//                                         <div style={{ marginTop: '10px', color: 'red' }}>
//                                             No data found for the selected date range.
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div >
//                 <div class="card-body flex flex-row justify-between">
//                     <Card style={{ width: 600, height: 400, backgroundColor: "white" }}>
//                         <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black' }}>Formaldehyde</h4>
//                         <CardContent>
//                             <div style={{ height: '100%' }}>
//                                 <div style={{ height: '100%' }}>
//                                     {/* <div className="select-box">
//                                         <label htmlFor="timeRange">Select Time Range:</label>
//                                         <select id="timeRange" value={selectedTimeRange} onChange={handleTimeRangeChange}>
//                                             <option value="now">Now</option>
//                                             <option value="1day">1 Day</option>
//                                             <option value="7days">7 Days</option>
//                                             <option value="30days">30 Days</option>
//                                         </select>
//                                     </div> */}
//                                     {hasData ? (
//                                         <Formaldehyde_smart data={data_smart} key={resetCount} timeRange={selectedTimeRange} style={{ height: '100%' }} />
//                                     ) : (
//                                         <div style={{ marginTop: '10px', color: 'red' }}>
//                                             No data found for the selected date range.
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                     <Card style={{ width: 600, height: 400, backgroundColor: "white" }}>
//                         <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black' }}>PM 2.5</h4>
//                         <CardContent>
//                             <div style={{ height: '100%' }}>
//                                 <div style={{ height: '100%' }}>
//                                     {/* <button onClick={handleButtonResetClick}>
//                                         <FontAwesomeIcon icon={faRotateRight} />
//                                     </button> */}
//                                     {hasData ? (
//                                         // Pass resetCount as a key to force re-render when it changes
//                                         <Pm25_smart data={data_smart} key={resetCount} style={{ height: '100%' }} />
//                                     ) : (
//                                         <div style={{ marginTop: '10px', color: 'red' }}>
//                                             No data found for the selected date range.
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div >
//             </div >
//             {/* ----------------------------------------------Sensor---------------------------------------------- */}
//             <div class="relative card card-compact bg-base-100 shadow-lg rounded-md border" style={{backgroundColor:'#EEEEEE', margin: '20px' }}>
//                 <div class="card-body flex flex-row justify-between">
//                     <Card style={{ width: '100%', height: '80vh', backgroundColor: 'white' }}>
//                         <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black' }}>Temp & Humid</h4>
//                         <CardContent style={{ height: '100%' }}>
//                             <div style={{ height: '80%' }}>
//                                 {/* Adjust the height percentage as needed */}
//                                 <div style={{ height: '100%' }}>
//                                     <DatePicker
//                                         selected={startDate}
//                                         onChange={handleStartDateChange}
//                                         selectsStart
//                                         startDate={startDate}
//                                         endDate={endDate}
//                                         showTimeSelect
//                                         timeFormat="HH:mm"
//                                         timeIntervals={15}
//                                         dateFormat="dd MMM HH:mm"
//                                         showIcon
//                                     />
//                                     <DatePicker
//                                         selected={endDate}
//                                         onChange={handleEndDateChange}
//                                         selectsEnd
//                                         startDate={startDate}
//                                         endDate={endDate}
//                                         minDate={startDate}
//                                         showTimeSelect
//                                         timeFormat="HH:mm"
//                                         timeIntervals={15}
//                                         dateFormat="dd MMM HH:mm"
//                                         showIcon
//                                     />
//                                     <button onClick={() => handleButtonClick()}>
//                                         <FontAwesomeIcon icon={faSearch} />
//                                     </button>
//                                     {hasData ? (
//                                         <Sensor_TH data={data_sensor} style={{ height: '100%', width: '100%' }} />
//                                     ) : (
//                                         <div style={{ marginTop: '10px', color: 'red' }}>
//                                             No data found for the selected date range.
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div >
//                 <div class="card-body flex flex-row justify-between">
//                     <Card style={{ width: 600, height: 400, backgroundColor: "white" }}>
//                         <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black' }}>Voltage</h4>
//                         <CardContent>
//                             <div style={{ height: '100%' }}>
//                                 <div style={{ height: '100%' }}>
//                                     <button onClick={handleButtonResetClick}>
//                                         <FontAwesomeIcon icon={faRotateRight} />
//                                     </button>
//                                     {hasData ? (
//                                         // Pass resetCount as a key to force re-render when it changes
//                                         <Voltage_sensor data={data_sensor} key={resetCount} style={{ height: '100%' }} />
//                                     ) : (
//                                         <div style={{ marginTop: '10px', color: 'red' }}>
//                                             No data found for the selected date range.
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                     <Card style={{ width: 600, height: 400, backgroundColor: "white" }}>
//                         <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black' }}>Linkquality</h4>
//                         <CardContent>
//                             <div style={{ height: '100%' }}>
//                                 <div style={{ height: '100%' }}>
//                                     {/* <button onClick={handleButtonResetClick}>
//                                         <FontAwesomeIcon icon={faRotateRight} />
//                                     </button> */}
//                                     {hasData ? (
//                                         // Pass resetCount as a key to force re-render when it changes
//                                         <Linkquality_sensor data={data_sensor} key={resetCount} style={{ height: '100%' }} />
//                                     ) : (
//                                         <div style={{ marginTop: '10px', color: 'red' }}>
//                                             No data found for the selected date range.
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                     <Card style={{ width: 600, height: 400, backgroundColor: "white" }}>
//                         <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black' }}>Battery</h4>
//                         <CardContent>
//                             <div style={{ height: '100%' }}>
//                                 <div style={{ height: '100%' }}>
//                                     {/* <button onClick={handleButtonResetClick}>
//                                         <FontAwesomeIcon icon={faRotateRight} />
//                                     </button> */}
//                                     {hasData ? (
//                                         // Pass resetCount as a key to force re-render when it changes
//                                         <Battery_sensor data={data_sensor} key={resetCount} style={{ height: '100%' }} />
//                                     ) : (
//                                         <div style={{ marginTop: '10px', color: 'red' }}>
//                                             No data found for the selected date range.
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div >
//             </div >
//         </>
//     );
// }

// export default HomeTest;

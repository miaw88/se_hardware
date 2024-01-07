import { useState, useEffect } from 'react';
import axios from 'axios';
import { blue, red, grey, yellow } from "@mui/material/colors";
import { Paper, Box, Typography, CardContent, Card, CardActions, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
import ChartSensor from '../chart/smart_air/sensor_tem_hum';
import Co2_smart from '../chart/smart_air/co2';


function Home() {
    const [data_smart, setData_smart] = useState([]);
    const [hasData, setHasData] = useState(true); // New state for tracking data presence

    const GetData_smart = async () => {
        try {
            const response = await axios.get('http://localhost:8080/smart_air');
            setData_smart(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        // Trigger search when endDate changes
        handleButtonClick();
    };

    const handleButtonClick = () => {
        // เตรียมข้อมูลที่จะส่งไปยัง API
        const requestData = {
            startDate: startDate.toISOString(), // แปลงวันที่เป็น ISO string
            endDate: endDate.toISOString(),
        };
        console.log(startDate, endDate);
        // ทำการเรียก API โดยใช้ fetch หรือ axios
        fetch('http://localhost:8080/smart_air/set-date', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .then(resultData => {
                if (resultData.data.rows.length > 0) {
                    setData_smart(resultData.data.rows);
                    setHasData(true); // Set the state to indicate data is present
                } else {
                    setHasData(false); // Set the state to indicate no data
                }
            })
    };



    useEffect(() => {
        GetData_smart();
    }, [startDate, endDate]); // Fetch data only once when the component mounts

    return (
        <>
            <div class="relative card card-compact bg-base-100 shadow-lg rounded-md border" style={{ margin: '20px' }}>
                <div class="card-body flex flex-row justify-between">
                    <Card style={{ width: 600, height: 400, backgroundColor: "white" }}>
                        <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black' }}>Temp & Humid</h4>
                        <CardContent>
                            <div style={{ height: '100%' }}>
                                <div style={{ height: '100%' }}>
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
                                    <button onClick={() => handleButtonClick()}>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                    {hasData ? (
                                        <ChartSensor data={data_smart} style={{ height: '100%' }} />
                                    ) : (
                                        <div style={{ marginTop: '10px', color: 'red' }}>
                                            No data found for the selected date range.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div >
                <div class="card-body flex flex-row justify-between">
                    <Card style={{ width: 600, height: 400, backgroundColor: "white" }}>
                        <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black' }}>API radar</h4>
                        <CardContent>
                            <div style={{ height: '100%' }}>
                                <div style={{ height: '100%' }}>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div >
            <div class="relative card card-compact bg-base-100 shadow-lg rounded-md border" style={{ margin: '20px' }}>
                <div class="card-body flex flex-row justify-between">
                    <Card style={{ width: 600, height: 400, backgroundColor: "white" }}>
                        <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black' }}>CO2</h4>
                        <CardContent>
                            <div style={{ height: '100%' }}>
                                <div style={{ height: '100%' }}>
                                        <Co2_smart data={data_smart} style={{ height: '100%' }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div >
                <div class="card-body flex flex-row justify-between">
                    <Card style={{ width: 600, height: 400, backgroundColor: "white" }}>
                        <h4 class="text-xl font-bold text-gray-700" style={{ marginLeft: '20px', marginTop: '20px', color: 'black' }}>VOC</h4>
                        <CardContent>
                            <div style={{ height: '100%' }}>
                                <div style={{ height: '100%' }}>

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div >
            <div>
                <div class="relative card card-compact bg-base-100 shadow-lg rounded-md border" style={{ margin: '20px' }}>
                    <div class="card-body flex flex-row justify-between">
                        <h2 class="text-xl font-bold text-gray-700">
                            <a>Formaldehyd</a>
                        </h2>
                        <p class="text-md font-semibold text-gray-400"></p>
                        {/* <div class="flex flex-row space-x-2 pt-4">
                    </div > */}
                    </div >
                </div >
                <div class="relative card card-compact bg-base-100 shadow-lg rounded-md border" style={{ margin: '20px' }}>
                    <div class="card-body flex flex-row justify-between">
                        <h2 class="text-xl font-bold text-gray-700">
                            <a>PM2.5</a>
                        </h2>
                        <p class="text-md font-semibold text-gray-400"></p>
                        {/* <div class="flex flex-row space-x-2 pt-4">
                    </div > */}
                    </div >
                </div >
            </div>
            <br></br>
            <div class="relative card card-compact w-full bg-base-100 shadow-lg rounded-md border">
                <div class="card-body flex flex-row justify-between">
                    <h2 class="text-xl font-bold text-gray-700">
                        <a>llllll</a>
                    </h2>
                    <p class="text-md font-semibold text-gray-400"></p>
                    {/* <div class="flex flex-row space-x-2 pt-4">
                    </div > */}
                </div >
            </div >
        </>
    );
}

export default Home;

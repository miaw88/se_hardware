const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = 8080;

app.use(cors())

const mqttCon = require('./mqtt_connect')
const pgCon = require('./postgresql_connect')
const InsertFunction = require('./functionInsert')

mqttCon.MqttConnected()
pgCon.PgConnected()
InsertFunction.InsertData()

// import route
const Route = require('./route/api')

app.get('/smart_air', Route.GetData_smart)  
app.get('/sensor', Route.GetData_sensor)  
app.post('/smart_air/set-date', Route.FilterDateAir)  
app.post('/sensor_small/set-date', Route.FilterDateSensor)  
app.post('/set-date', Route.FilterDateHome)
// app.post('/home/set-date', Route.FilterDateHome)

app.listen(port, () => {
    console.log('server listening on port ' + port);
});
const mqttCon = require('./mqtt_connect')
const pgCon = require('./postgresql_connect')

const InsertData = () => {
    // Handle incoming messages
mqttCon.client.on('message', ( topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
    console.log(`massage ${topic}: ${message}`);
    const data = JSON.parse(message.toString());

    // Check if the topic is 'testmeow02/Sensor'
    if (topic === 'testmeow02/Sensor') {
        const query = 'INSERT INTO sensor_complete (battery, humidity, linkquality, temperature, voltage, datetime) VALUES ($1, $2, $3, $4, $5, now())';
        const values = [data.battery, data.humidity, data.linkquality, data.temperature, data.voltage];

        pgCon.pgClient.query(query, values)
            .then(() => console.log('Sensor data inserted into PostgreSQL'))
            .catch(err => console.error('Error inserting Sensor data into PostgreSQL', err));
    } else if (topic === 'testmeow02/SmartAirSensor') {
        // Handle 'testmeow02/SmartAirSensor' topic data
        const SmartAirSensorQuery = 'INSERT INTO smart_air_complete (co2, formaldehyd, humidity, linkquality, pm25, temperature, voc, datetime) VALUES ($1, $2, $3, $4, $5, $6, $7, now())';
        const SmartAirSensorValues = [data.co2, data.formaldehyd, data.humidity, data.linkquality, data.pm25, data.temperature, data.voc];

        pgCon.pgClient.query(SmartAirSensorQuery, SmartAirSensorValues)
            .then(() => console.log('SmartAirSensor data inserted into PostgreSQL'))
            .catch(err => console.error('Error inserting SmartAirSensor data into PostgreSQL', err));
    }
});

}
module.exports = { InsertData }
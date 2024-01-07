const mqtt = require('mqtt');

const brokerUrl = 'mqtt://mqtt-dashboard.com:1883';
const options = {
  username: 'Admin',
  password: 'Admin',
  clientId: 'clientId-' + Math.random().toString(16).substr(2, 8)
};

// Connect to MQTT broker

const client = mqtt.connect(brokerUrl, options);
const MqttConnected = () => {

    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.subscribe('testmeow02/Sensor', (err) => {
            if (!err) {
                console.log('Subscribed to topic: testmeow02/Sensor');
            }
        });
        client.subscribe('testmeow02/SmartAirSensor', (err) => {
            if (!err) {
                console.log('Subscribed to topic: testmeow02/SmartAirSensor');
            }
        });
    });
    
    client.on('error', (err) => {
        console.error('Error connecting to MQTT broker:', err);
    });
    
    client.on('close', () => {
        console.log('Connection to MQTT broker closed');
    });
}

module.exports = { MqttConnected, client }

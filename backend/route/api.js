const {pgCon} = require('../postgresql_connect');
const {pgClient} = require('../postgresql_connect')


const GetData_smart = async (req, res) => {
  try {
    const query = 'SELECT * FROM public.smart_air_complete';
    const { rows } = await pgClient.query(query); // Fix the variable name here
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Error querying data from PostgreSQL', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
const GetData_sensor = async (req, res) => {
  try {
    const query = 'SELECT * FROM public.sensor_complete';
    const { rows } = await pgClient.query(query); // Fix the variable name here
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Error querying data from PostgreSQL', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const FilterDateAir = async (req, res) => {
  console.log(req.body.startDate,req.body.endDate);
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);
  const query = 'SELECT * FROM public.smart_air_complete WHERE datetime BETWEEN $1 AND $2';
  pgClient.query(query, [startDate, endDate], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Error retrieving data from database' });
    } else {
      // ส่งข้อมูลที่ได้กลับไปให้ frontend
      res.json({ message: 'Data retrieved successfully', data: result });
    }
  });
};

const FilterDateSensor = async (req, res) => {
  console.log(req.body.startDate,req.body.endDate);
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);
  const query = 'SELECT * FROM public.sensor_complete WHERE datetime BETWEEN $1 AND $2';
  pgClient.query(query, [startDate, endDate], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Error retrieving data from database' });
    } else {
      // ส่งข้อมูลที่ได้กลับไปให้ frontend
      res.json({ message: 'Data retrieved successfully', data: result });
    }
  });
};

const FilterDateHome = async (req, res) => {
  try {
    console.log(req.body.startDate, req.body.endDate);
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    console.log("start",startDate);
    console.log("end",endDate);

    const querySensor = 'SELECT * FROM public.sensor_complete WHERE datetime BETWEEN $1 AND $2';
    const querySmartAir = 'SELECT * FROM public.smart_air_complete WHERE datetime BETWEEN $1 AND $2';

    const [resultSensor, resultSmartAir] = await Promise.all([
      pgClient.query(querySensor, [startDate, endDate]),
      pgClient.query(querySmartAir, [startDate, endDate]),
    ]);

    // Combine the results from both tables
    const combinedResult = {
      sensorData: resultSensor.rows,
      smartAirData: resultSmartAir.rows,
    };

    // ส่งข้อมูลที่ได้กลับไปให้ frontend
    res.json({ message: 'Data retrieved successfully', data: combinedResult });
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ error: 'Error retrieving data from database' });
  }
};

module.exports = { GetData_smart, GetData_sensor, FilterDateAir, FilterDateSensor,FilterDateHome };

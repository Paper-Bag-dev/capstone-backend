import streamArduinoData from "../events/streamArduinoData.js";

const realtimeData = async (req, res) => {
  const data = req.body;

  console.log("Received data from cloud:", data);

  streamArduinoData(data);
  res.status(200).send({ success: true, message: "Data broadcasted to frontend" });

}

export default realtimeData;
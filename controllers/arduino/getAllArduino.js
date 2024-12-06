import Arduino from "../../models/arduino.js";

const getAllArduino = async (req, res) => {
  try {
    const arduinoDevices = await Arduino.find({});
    res.status(200).json({ success: true, total: arduinoDevices?.length, data: arduinoDevices });
  } catch (error) {
    console.error("Error fetching Arduino devices:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export default getAllArduino;


import Arduino from "../../models/arduino.js";

const getArduinoById = async (req, res) => {
  try {
    const { id } = req.params;
    const arduinoDevice = await Arduino.findOne({ deviceId: id });

    if (!arduinoDevice) {
      return res.status(404).json({ success: false, message: "Device not found" });
    }

    res.status(200).json({ success: true, data: arduinoDevice });
  } catch (error) {
    console.error("Error fetching Arduino device:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


export default getArduinoById;
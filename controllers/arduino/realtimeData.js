import { broadcast } from "../events/initEvents.js";
import Arduino from "../../models/arduino.js";

const realtimeData = async (req, res) => {
  try {
    let updates = req.body;

    if (!Array.isArray(updates)) {
      updates = [updates];
    }

    // Mapping data for distinct devices
    const groupedData = updates.reduce((acc, { id, name, data, time }) => {
      if (!acc[id]) {
        acc[id] = { name, latestVoc: data, updates: [] };
      }
      acc[id].updates.push({ time, voc: data });

      // Update latest VOC if the current one is newer
      if (time > (acc[id].latestTime || 0)) {
        acc[id].latestVoc = data;
        acc[id].latestTime = time;
      }
      return acc;
    }, {});

    // MongoDB bulk operations
    const bulkOps = Object.entries(groupedData).map(([deviceId, { name, latestVoc, updates }]) => ({
      updateOne: {
        filter: { deviceId },
        update: {
          $set: { name, latestVoc },
          $push: { updates: { $each: updates } },
        },
        upsert: true,
      },
    }));

    const updatedData = await Arduino.bulkWrite(bulkOps);

    // Broadcast updates to all connected clients
    broadcast({ updates: true });

    return res.status(200).json({ success: true, message: "Arduino data updated successfully" });
  } catch (error) {
    console.error("Error updating Arduino data:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export default realtimeData;

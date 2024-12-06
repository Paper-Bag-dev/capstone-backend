import mongoose from "mongoose";

const updateSchema = new mongoose.Schema({
  time: { type: String, required: true },
  voc: { type: String, required: true },
});

const arduinoSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  name: { type: String, default: null },
  latestVoc: { type: String, required: true },
  updates: { type: [updateSchema], default: [] },
  battery: { type: String, default: "100%" },
});

const Arduino = mongoose.model("Arduino", arduinoSchema);

export default Arduino;

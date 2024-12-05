import { client } from "./initEvents.js";

const streamArduinoData = (data) => {
  if (client) {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
    console.log("Data sent to frontend:", data);
  }

}

export default streamArduinoData;
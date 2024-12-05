import logger from "../../utils/logger.js";

let client = null;

const initEvents = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Store the connection (only one client)
  client = res;

  logger.info("Frontend connected to SSE");

  // Handle client disconnection
  req.on("close", () => {
    logger.info("Frontend disconnected from SSE");
    client = null;
  });
}

export {
  initEvents,
  client,
}
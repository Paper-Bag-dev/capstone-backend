import logger from "../../utils/logger.js";


let clients = [];

const initEvents = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  clients.push(res);
  logger.info("Frontend connected to SSE");

  req.on("close", () => {
    logger.info("Frontend disconnected from SSE");
    clients.splice(clients.indexOf(res), 1);
  });
};

const broadcast = (message) => {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(message)}\n\n`);
  });
};

export { initEvents, broadcast, clients };

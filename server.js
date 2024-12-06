import express from "express";
import cors from "cors"
import morganMiddleware from "./middlewares/morgan.middleware.js";
import logger from "./utils/logger.js";
import eventsRoutes from "./api/v1/events/index.js"
import arduinoRoutes from "./api/v1/arduino/index.js"
import { config } from "dotenv";
import connectDb from "./Db/connect.js";

config({
  path: ".env"
});

const app = express();

const PORT = process.env.PORT || 5000;



app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
}));


app.use(morganMiddleware);

app.use('/api/events', eventsRoutes)
app.use('/api/arduinos', arduinoRoutes)

app.get("/api/status", (req, res) => {
  logger.info("Checking the API status: Everything is OK");

  res.status(200).send({
    status: "UP",
    message: "The API is up and running!",
  });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

// databse connection 
const databaseConnection = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.get("/", (req, res) => {
      res.send("Hi Welcome to Capstone Backend")
    })
  } catch (error) {
    console.log(error);
  }
}
databaseConnection();

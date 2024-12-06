import mongoose from "mongoose";
mongoose.set('strictQuery', false);
import logger from "../utils/logger.js";


// creating a connection to database
const connectDb = async (uri) => {
  return mongoose.connect(uri).then(() => {
    logger.info('Connected to Database Successfully');
  }).catch((error) => {
    logger.error(error);
  })
}

export default connectDb;
import { Router } from "express";
import { realtimeData } from "../../../controllers/arduino/index.js";
import { getAllArduino, getArduinoById } from "../../../controllers/arduino/index.js";

const router = Router();

router.get('/', getAllArduino);
router.get('/:id', getArduinoById);

router.post("/updates", realtimeData);

export default router
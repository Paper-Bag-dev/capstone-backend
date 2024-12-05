import { Router } from "express";
import { realtimeData } from "../../../controllers/arduino/index.js";

const router = Router();

router.post("/updates", realtimeData);

export default router
import { Router } from "express";
import { initEvents } from "../../../controllers/events/index.js";

const router = Router();

router.get('/', initEvents)

export default router;
import { Router } from "express";
import { getDataFromFrontend, printHellowWorld } from "../controllers/hwController.js";

const hwRouter = Router();

hwRouter.get("/print", printHellowWorld);
hwRouter.post("/ff", getDataFromFrontend);

export default hwRouter;

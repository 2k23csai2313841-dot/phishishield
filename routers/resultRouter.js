import express from "express";
const resultRouter = express.Router();

//internal Controller
import {
  result,
  analyzeUrl,
  resultReport,
} from "../controller/resultController.js";
import { requireLogin } from "../controller/requiredController.js";

resultRouter.get("/result", result);
resultRouter.post("/analyze-url", requireLogin, analyzeUrl);
resultRouter.get("/result-report", requireLogin, resultReport);

export default resultRouter;

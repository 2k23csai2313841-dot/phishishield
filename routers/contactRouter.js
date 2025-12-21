import express from "express";
const contactRouter = express.Router();

import { handleContactForm } from "../controller/contactController.js";

contactRouter.post("/contact", handleContactForm);

export default contactRouter;

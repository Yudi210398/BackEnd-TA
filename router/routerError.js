import { error } from "../controller/controllerError.js";
import express from "express";
const routerError = express.Router();
routerError.use(error);

export default routerError;

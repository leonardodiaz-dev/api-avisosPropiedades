import express from "express";
import { buscar, getDistritosByProvincia } from "../controllers/distritoController";

export const distritoRouter = express.Router()

distritoRouter.get('/distritos/buscar',buscar)
distritoRouter.get('/distritos/:id',getDistritosByProvincia)
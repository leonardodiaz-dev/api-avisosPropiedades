import express from "express";
import { eliminarImagenes, uploadImagen } from "../controllers/imagenController";
import { upload } from "../middlewares/upload";

export const imagenRouter = express.Router();

imagenRouter.post("/imagenes", upload.array("imagenes", 10), uploadImagen);
imagenRouter.delete("/imagenes", eliminarImagenes);




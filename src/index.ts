import express from 'express'
import morgan from 'morgan'
import { usuarioRouter } from './routes/usuarioRoute';
import dotenv from 'dotenv';
import { departamentoRouter } from './routes/departamentoRoute';
import { propiedadRouter } from './routes/propiedadRoute';
import { provinciaRouter } from './routes/provinciaRoute';
import { distritoRouter } from './routes/distritoRoute';
import { caracteristicaRouter } from './routes/caracterisiticaRoute';
dotenv.config();
import cors from 'cors'
import { tipoPropiedadRouter } from './routes/tipoPropiedadRoute';
import { imagenRouter } from './routes/imagenRoute';
import path from 'path';
import { mensajeRouter } from './routes/mensajeRoute';
import { favoritoRouter } from './routes/favoritoRoute';
import { visualizacionRouter } from './routes/visualizacionRoute';
const app = express();

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], 
  credentials: true 
}));
app.use(express.json());  
app.use(usuarioRouter); 
app.use(propiedadRouter)
app.use(departamentoRouter)
app.use(provinciaRouter)
app.use(distritoRouter)
app.use(caracteristicaRouter)
app.use(tipoPropiedadRouter)
app.use(imagenRouter)
app.use(mensajeRouter)
app.use(favoritoRouter)
app.use(visualizacionRouter)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

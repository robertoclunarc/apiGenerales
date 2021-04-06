import express from "express";
import provRoutes from "./routes/compras/proveedor.route";
import activoRoutes from "./routes/AdministracionCatalogo/activos.route";
import cargoRouters from './routes/configuraciones/config_cargos.route';
import morgan from "morgan";
import dotenv from 'dotenv';
import cors from 'cors'

//setting
const app = express();
dotenv.config();
app.set("port", process.env.PORT || 3000);
app.set('trust proxy', true);


//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.listen(app.get("port"));
console.log("Server express on port:", app.get("port"));

app.use('/proveedores',provRoutes);
app.use('/activos',activoRoutes);
app.use('/cargos',cargoRouters);
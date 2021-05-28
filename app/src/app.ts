import express from "express";
import path from 'path';
//import provRoutes from "./routes/compras/proveedor.router";
import activoRoutes from "./routes/AdministracionCatalogo/activos.router";
import areasTrabajoRouter from './routes/AdministracionCatalogo/areasTrabajo.router';
import cargoRouters from './routes/configuraciones/config_cargos.router';
import gerenciasRouter from './routes/configuraciones/config_gerencias.router'
import ciudadesRouter from './routes/configuraciones/config_ciudades.router';
import estadosRouter from './routes/configuraciones/config_estados.router';
import municipioRouter from './routes/configuraciones/config_municipios.router';
import zonapostRouter from './routes/configuraciones/config_zonapost.router';
import parroquiaRouter from './routes/configuraciones/config_parroquia.router';
import noticiaRouter from './routes/configuraciones/config_noticias.router';
import gen_emp_areaRouter from './routes/generales/gen_emp_area.router';
import sergenRouter from './routes/configuraciones/config_serv_ger.router';
import paramsistemRouter from './routes/configuraciones/config_param_sist.router';
import gerenciasTempRouter from './routes/configuraciones/config_gerencias_temp.router';
import empresaRouter from './routes/generales/gen_empresa.router';
import areanegocioRouter from './routes/generales/gen_area_negocio.router';
import ccostoRouter from './routes/generales//gen_centro_costos.router';
import preguntasRouter from './routes/generales/gen_preguntas.router';
import respuestasRouter from './routes/generales/gen_respuestas.router';

import {createToken} from './controllers/signin';

import morgan from "morgan";
import dotenv from 'dotenv';
import cors from 'cors'

//setting
const app = express();
dotenv.config();
app.set("port", process.env.APP_PORT);
app.set('trust proxy', true);

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.listen(app.get("port"));
console.log("Server express on port:", app.get("port"));

app.get('/token/:login', createToken);

app.use('/uploads',express.static(path.resolve('uploads')));

//app.use('/compras/proveedores',provRoutes); <-----deshabilitado el 28/05/2021

app.use('/adm/activos',activoRoutes);
app.use('/adm/areasTrabajo', areasTrabajoRouter);

app.use('/config/cargos',cargoRouters);
app.use('/config/gerencias', gerenciasRouter);
app.use('/config/ciudades', ciudadesRouter);
app.use('/config/estados', estadosRouter);
app.use('/config/municipios', municipioRouter);
app.use('/config/zonaspostales', zonapostRouter);
app.use('/config/parroquias', parroquiaRouter);
app.use('/config/noticias',noticiaRouter);
app.use('/config/servgen', sergenRouter);
app.use('/config/paramsistem', paramsistemRouter);
app.use('/config/gerenciastemp',gerenciasTempRouter);

app.use('/generales/empresas',empresaRouter);
app.use('/generales/gen_emp', gen_emp_areaRouter);
app.use('/generales/area_negocio', areanegocioRouter);
app.use('/generales/ccosto', ccostoRouter);
app.use('/generales/preguntas', preguntasRouter);
app.use('/generales/respuestas', respuestasRouter);

app.get('/', (req, res) => {
	const message = `Las APIs se ejecutan en el puerto: ${process.env.MYSQL_SERVER}`;
	res.json({
		message
	});
});

app.use((req, res, next) => {
	res.status(404).json({
		err: 'Error, Ruta no encontrada'
	});
	next();
});
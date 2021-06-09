import express from "express";
import path from 'path';
import db from "./database";

import routers from './routes/index.router';

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

app.listen(app.get("port"), ()=>{ 
	console.log("Server express on port:", app.get("port")); 
});

app.use('/uploads',express.static(path.resolve('uploads')));

db.conectarBD();

app.get('/', (req, res) => {
	const message = `Las APIs se ejecutan en el puerto: ${process.env.APP_PORT}`;
	res.json({
		message
	});
});

app.use('/api',routers);

app.use((req, res, next) => {
	res.status(404).json({
		err: 'Error, Ruta no encontrada'
	});
	next();
});


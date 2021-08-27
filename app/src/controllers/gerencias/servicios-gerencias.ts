import { Request, Response } from 'express';
import ServiciosGerencias from 'interfaces/gerencias/servicios-gerencias.interface';
import db from '../../database';

// import { Iconfig_gerencias } from "../../interfaces/configuraciones/configuraciones.interface";

export const getAllServiciosGerencia = async (req: Request, resp: Response) => {
    let consulta = 'SELECT * FROM config_servicios_gerencias';

    try {
        const result: ServiciosGerencias[] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: 'No Data!' });
        }
        return resp.status(201).json(result);
    } catch (error) {
        resp.status(401).json({ err: error });
    }
};

export const getOneServicioGerencia = async (req: Request, resp: Response) => {
    const idServicio: number = +req.params.idServicio;
    let consulta = `SELECT * FROM config_servicios_gerencias WHERE idServiciosGerencias = ${idServicio}`;

    try {
        const result : ServiciosGerencias[]= await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: 'No Data!' });
        }
        return resp.status(201).json(result);
    } catch (error) {
        resp.status(401).json({ err: error });
    }
};

export const getPorGerencia = async (req: Request, resp: Response) => {
    const idGerencia: number = +req.params.idGerencia;
    let consulta = `SELECT * FROM config_servicios_gerencias WHERE idGerencia = ${idGerencia}`;

    try {
        const result: ServiciosGerencias[] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: 'No Data!' });
        }
        return resp.status(201).json(result);
    } catch (error) {
        resp.status(401).json({ err: error });
    }
};

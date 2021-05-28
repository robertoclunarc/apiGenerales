import { json, Request, Response } from "express";
import db from "../../database";
import { Iconfig_parametros_sistemas } from "../../interfaces/configuraciones/configuraciones.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM config_parametros_sistema";    
    try {
        const result = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    
    let update: Iconfig_parametros_sistemas = req.body;

    let consulta = ("UPDATE config_parametros_sistema SET ? ");
    try {
        const result = await db.querySelect(consulta, [update]);
        resp.status(201).json("Parametros actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error ": error })
    }   
}
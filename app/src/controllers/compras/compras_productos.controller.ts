import { json, Request, Response } from "express";
import db from "../../database";
import { IAdm_productos } from "../../interfaces/compras/compras.interface";

export const SelectRecordAll = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM adm_productos";  
    try {
        const result = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(201).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectRecordFilter = async (req: Request, resp: Response) => {
    let codigo = req.params.codigo;
    let consulta = "Select * FROM adm_productos WHERE codigo = ?";  
    try {
        const result = await db.querySelect(consulta, [codigo]);
        if (result.length <= 0) {
            return resp.status(201).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}
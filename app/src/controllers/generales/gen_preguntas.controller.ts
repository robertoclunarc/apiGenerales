import { json, Request, Response } from "express";
import db from "../../database";
import { Igen_preguntas_gerencias } from "../../interfaces/generales/generales.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM gen_preguntas_gerencias";
      
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
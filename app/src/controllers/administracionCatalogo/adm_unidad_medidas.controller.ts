import { json, Request, Response } from "express";
import db from "../../database";
import { Iadm_unidadmedida} from "../../interfaces/AdministracionCatalogo/AdmCatalogo.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT um.*, tm.nombre as tipoMedida,  um.nombre as label,  um.idAdmUnidadMedida as value FROM  adm_unidad_medidas um INNER JOIN adm_tipo_medidas tm  ON  tm.idAdmTipoMedida = um.idAdmTipoMedida order by tm.idAdmTipoMedida";
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
    let consulta = "SELECT * FROM adm_unidad_medidas WHERE idAdmUnidadMedida = ?";
    try {
        const result = await db.querySelect(consulta, [req.params.Id]);
        if (result.length <= 0) {
            return resp.status(201).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const createRecord = async (req: Request, resp: Response) => {
    let newPost: Iadm_unidadmedida = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO adm_unidad_medidas SET ?", [newPost]);    
        newPost.idAdmUnidadMedida = result.insertId;
        return resp.status(201).json(newPost.idAdmUnidadMedida);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Iadm_unidadmedida = req.body;

    let consulta = ("UPDATE adm_unidad_medidas SET ? WHERE idAdmUnidadMedida = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("unidad de medida actualizada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from adm_unidad_medidas WHERE idAdmUnidadMedida = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Unidad de Medida eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error ": error })
    }   
}
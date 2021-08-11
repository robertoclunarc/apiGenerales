import { json, Request, Response } from "express";
import db from "../../database";
import { Iadm_tiposActivo } from "../../interfaces/AdministracionCatalogo/AdmCatalogo.interface";


export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM adm_tipos_activos";  
     
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

export const createRecord = async (req: Request, resp: Response) => {
    let newPost: Iadm_tiposActivo = req.body;
    
    try {
        const result = await db.querySelect("INSERT INTO adm_tipos_activos SET ?", [newPost]);    
        newPost.idAdmTipoActivo = result.insertId;
        console.log(newPost);
        return resp.status(201).json(newPost);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Iadm_tiposActivo = req.body;
    
    let consulta = ("UPDATE adm_tipos_activos SET ? WHERE idAdmTipoActivo = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Tipo Activo actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from adm_tipos_activos WHERE idAdmTipoActivo = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Tipo Activo eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error ": error })
    }   
}
import { json, Request, Response } from "express";
import db from "../../database";
import { Iadm_areas_trabajo } from "../../interfaces/AdministracionCatalogo/AdmCatalogo.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT  atg.*, g.nombre as gerencia FROM adm_areas_trabajo atg  INNER JOIN gen_area_negocio g ON g.idGenAreaNegocio = atg.idGenAreaNegocio ORDER BY atg.idGenAreaNegocio, atg.idAreaTrabajo";    
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

export const SelectRecordFilter = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM adm_areas_trabajo";
    let Area = {
        idAreaTrabajo: req.params.Id,
        nombre: req.params.nombre,          
        idGenAreaNegocio: req.params.idGenAreaNegocio
    }
    let where: string[] = [];
    
    if (Area.idAreaTrabajo!="NULL" || Area.nombre!="NULL" || Area.idGenAreaNegocio!="NULL"){        
        if (Area.idAreaTrabajo!="NULL"){
           where.push( " idAreaTrabajo =" + Area.idAreaTrabajo);
        }

        if(Area.nombre!="NULL"){
            where.push( " LOWER(nombre) LIKE LOWER('%" + Area.nombre + "%')");
        }                

        if (Area.idGenAreaNegocio!="NULL"){
            where.push( " idGenAreaNegocio =" + Area.idGenAreaNegocio);
        }       

        where.forEach(function(where, index) {
            if (index==0){
                consulta = consulta + " WHERE " + where;
            }else{
                consulta = consulta + " OR " + where;
            }

        });        
        console.log(consulta);
    }
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

export const createRecord = async (req: Request, resp: Response) => {
    let newPost: Iadm_areas_trabajo = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO adm_areas_trabajo SET ?", [newPost]);    
        newPost.idAreaTrabajo = result.insertId;
        return resp.status(201).json(newPost.idAreaTrabajo);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Iadm_areas_trabajo = req.body;

    let consulta = ("UPDATE adm_areas_trabajo SET ? WHERE idAreaTrabajo = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Area de Trabajo actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("UPDATE adm_areas_trabajo SET estatus=0 WHERE idAreaTrabajo = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Area de Trabajo eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error ": error })
    }   
}
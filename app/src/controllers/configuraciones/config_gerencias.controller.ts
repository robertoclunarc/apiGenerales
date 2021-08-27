import { Request, Response } from "express";
import { Iadm_areas_trabajo } from "interfaces/AdministracionCatalogo/AdmCatalogo.interface";
import db from "../../database";
// import { Iconfig_gerencias } from "../../interfaces/configuraciones/configuraciones.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT g.* , g.nombre AS label, g.idConfigGerencia AS value FROM config_gerencias g";    
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

export const gerenciasSinActual = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM config_gerencias WHERE idConfigGerencia <> ?";    
    try {
        const result = await db.querySelect(consulta, [req.params.Id]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const areasTrabajo = async (req: Request, resp: Response) => {
    let consulta = "SELECT ar.*, ar.nombre as label, ar.idAreaTrabajo as value, ar.idAreaTrabajo as idAdmAreaTrabajoGerencia FROM adm_areas_trabajo ar INNER JOIN adm_areas_relacion_gerencia rela ON ar.idAreaTrabajo = rela.idAreaTrabajo WHERE rela.idConfigGerencia = ?";    
    try {
        const result = await db.querySelect(consulta,  req.params.Id);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectRecordFilter = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM config_gerencias where estatus=1";
    let gerencia = {
        idConfigGerencia: req.params.Id,
        nombre: req.params.nombre,          
        descripcion: req.params.descripcion
    }
    let where: string[] = [];
    
    if (gerencia.idConfigGerencia!="NULL" || gerencia.nombre!="NULL" || gerencia.descripcion!="NULL"){        
        if (gerencia.idConfigGerencia!="NULL"){
           where.push( " idConfigGerencia =" + gerencia.idConfigGerencia);
        }

        if(gerencia.nombre!="NULL"){
            where.push( " LOWER(nombre) LIKE LOWER('%" + gerencia.nombre + "%')");
        }                

        if (gerencia.descripcion!="NULL"){
            where.push( " LOWER(descripcion) LIKE LOWER('%" + gerencia.descripcion + "%')");
        }       

        where.forEach(function(where, index) {
            if (index==0){
                consulta = consulta + " AND " + where;
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
        const result = await db.querySelect("INSERT INTO config_gerencias SET ?", [newPost]);    
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

    let consulta = ("UPDATE config_gerencias SET ? WHERE idConfigGerencia = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Gerencia actualizada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("UPDATE config_gerencias SET estatus=0 WHERE idConfigGerencia = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Gerencia eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error ": error })
    }   
}
import { json, Request, Response } from "express";
import db from "../../database";
import { Iconfig_servicios_gerencias } from "../../interfaces/configuraciones/configuraciones.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM config_servicios_gerencias where estatus=1";    
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
    let consulta = "SELECT * FROM config_servicios_gerencias";
    let sergen = {
        idServiciosGerencias: req.params.Id,
        nombre: req.params.nombre,
        descripcion: req.params.descripcion,
        idGerencia: req.params.idGerencia,
        
    }
    let where: string[] = [];
    
    if (sergen.idServiciosGerencias!="NULL" || sergen.nombre!="NULL" || sergen.descripcion!="NULL" || sergen.idGerencia!="NULL"){        
        if (sergen.idServiciosGerencias!="NULL"){
           where.push( " idServiciosGerencias =" + sergen.idServiciosGerencias);
        }

        if(sergen.nombre!="NULL"){
            where.push( " LOWER(nombre) LIKE LOWER('%" + sergen.nombre + "%')");
        }                

        if (sergen.idGerencia!="NULL"){
            where.push( " idGerencia =" + sergen.idGerencia);
        }        

        if(sergen.descripcion!="NULL"){
            where.push( " LOWER(descripcion) LIKE LOWER('%" + sergen.descripcion + "%')");
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
    let newPost: Iconfig_servicios_gerencias = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO config_servicios_gerencias SET ?", [newPost]);    
        newPost.idServiciosGerencias= result.insertId;
        return resp.status(201).json(newPost.idServiciosGerencias);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Iconfig_servicios_gerencias = req.body;

    let consulta = ("UPDATE config_servicios_gerencias SET ? WHERE idServiciosGerencias = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Registro actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("UPDATE config_servicios_gerencias SET estatus=0 WHERE idServiciosGerencias = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Registro eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error ": error })
    }   
}
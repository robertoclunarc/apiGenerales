import { json, Request, Response } from "express";
import db from "../../database";
import { Iadm_activos } from "../../interfaces/AdministracionCatalogo/activos.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM adm_activos";    
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
    let consulta = "Select * FROM adm_activos";
    let Act = {
        idAdmActivo: req.params.Id,
        nombre: req.params.nombre,
        descripcion: req.params.descripcion,  
        serial: req.params.serial,
        idAdmProducto: req.params.idAdmProducto,
        idComprasEmpresa: req.params.idComprasEmpresa
    }
    let where: string[] = [];
    
    if (Act.idAdmActivo!="NULL" || Act.nombre!="NULL" || Act.descripcion!="NULL" || Act.serial!="NULL" || Act.idAdmProducto!="NULL" || Act.idComprasEmpresa!="NULL" ){        
        if (Act.idAdmActivo!="NULL"){
           where.push( " idAdmActivo =" + Act.idAdmActivo);
        }

        if(Act.nombre!="NULL"){
            where.push( " LOWER(nombre) LIKE LOWER('%" + Act.nombre + "%')");
        }

        if(Act.descripcion!="NULL"){
            where.push( " LOWER(descripcion) LIKE LOWER('%" + Act.descripcion + "%')");
        }

        if (Act.serial!="NULL"){
            where.push( " LOWER(serial) LIKE LOWER('%" + Act.serial + "%')");
        }

        if (Act.idAdmProducto!="NULL"){
            where.push( " idAdmProducto =" + Act.idAdmProducto);
        }

        if (Act.idComprasEmpresa!="NULL"){
            where.push( " idComprasEmpresa =" + Act.idComprasEmpresa);
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
    let newPost: Iadm_activos = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO adm_activos SET ?", [newPost]);    
        newPost.idAdmActivo = result.insertId;
        return resp.status(201).json(newPost.idAdmActivo);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Iadm_activos = req.body;

    let consulta = ("UPDATE adm_activos SET ? WHERE idAdmActivo = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Activo actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("DELETE FROM adm_activos WHERE idAdmActivo = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Activo eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}
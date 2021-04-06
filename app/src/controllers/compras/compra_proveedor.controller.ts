import { json, Request, Response } from "express";
import db from "../../database";
import { IProveedores } from "../../interfaces/compras/proveedor.interface";

export const SelectRecordAll = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM compras_proveedores";    
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
    let consulta = "Select * FROM compras_proveedores";
    let prov = {
        idproveedor : req.params.Id,
        nombre : req.params.nombre,
        rif :req.params.rif,
        direccion: req.params.direccion,
        valoracion: req.params.valoracion,
        telefono: req.params.telefono,
        observaciones: req.params.observaciones,
        contacto: req.params.contacto
    }
    let where: string[] = [];
    
    if (prov.idproveedor!="NULL" || prov.nombre!="NULL" || prov.rif!="NULL" || prov.direccion!="NULL" || prov.valoracion!="NULL" || prov.telefono!="NULL" || prov.observaciones!="NULL" || prov.contacto!="NULL" ){        
        if (prov.idproveedor!="NULL"){
           where.push( " idProveedor =" + prov.idproveedor);
        }

        if(prov.nombre!="NULL"){
            where.push( " LOWER(nombre) LIKE LOWER('%" + prov.nombre + "%')");
        }

        if(prov.rif!="NULL"){
            where.push( " LOWER(rif) LIKE LOWER('%" + prov.rif + "%')");
        }

        if (prov.direccion!="NULL"){
            where.push( " LOWER(direccion) LIKE LOWER('%" + prov.direccion + "%')");
        }

        if (prov.valoracion!="NULL"){
            where.push( " valoracion =" + prov.valoracion);
        }

        if (prov.telefono!="NULL"){
            where.push( " telefono LIKE '%" + prov.telefono + "%'");
        }

        if (prov.observaciones!="NULL"){
            where.push( " LOWER(observaciones) LIKE LOWER('%" + prov.observaciones + "%')");
        }
        if (prov.contacto!="NULL"){
            where.push( " LOWER(contacto) LIKE LOWER('%" + prov.contacto + "%')");
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
    let newPost: IProveedores = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO compras_proveedores SET ?", [newPost]);    
        newPost.idProveedor = result.insertId;
        return resp.status(201).json(newPost.idProveedor);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IProveedores = req.body;

    let consulta = ("UPDATE compras_proveedores SET ? WHERE idProveedor = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Proveedor actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("DELETE FROM compras_proveedores WHERE idProveedor = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Proveedor eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}
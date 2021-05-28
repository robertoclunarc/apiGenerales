import { json, Request, Response } from "express";
import db from "../../database";
import { Igen_area_negocio } from "../../interfaces/generales/generales.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM gen_area_negocio where estatus=1";    
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
    let consulta = "SELECT arean.*,  gea.* FROM gen_area_negocio arean INNER JOIN gen_empre_area_gerencia gea ON gea.idGenAreaNegocio = arean.idGenAreaNegocio";
    let filtro = {         
        idGenAreaNegocio: req.params.Id,
        nombre: req.params.nombre,
        codigo: req.params.codigo,
        descripcion: req.params.descripcion,
        idConfigGerencia: req.params.idConfigGerencia,
        idAdmTipo: req.params.idAdmTipo        
    }

    let where: string[] = [];
    
    if (filtro.idGenAreaNegocio!="NULL" || filtro.codigo!="NULL" || filtro.nombre!="NULL" || filtro.descripcion!="NULL" || filtro.idConfigGerencia || filtro.idAdmTipo!="NULL"){        
        if (filtro.idGenAreaNegocio!="NULL"){
           where.push( " arean.idGenAreaNegocio =" + filtro.idGenAreaNegocio);
        }

        if(filtro.nombre!="NULL"){
            where.push( " LOWER(arean.nombre) LIKE LOWER('%" + filtro.nombre + "%')");
        }

        if(filtro.descripcion!="NULL"){
            where.push( " LOWER(arean.descripcion) LIKE LOWER('%" + filtro.descripcion + "%')");
        }

        if(filtro.codigo!="NULL"){
            where.push( " LOWER(arean.codigo) LIKE LOWER('%" + filtro.codigo + "%')");
        }        

        if (filtro.idConfigGerencia!="NULL"){
            where.push( " gea.idConfigGerencia = " + filtro.idConfigGerencia);
        }

        if (filtro.idConfigGerencia!="NULL"){
            where.push( " arean.idAdmTipo = " + filtro.idAdmTipo);
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
    let newPost: Igen_area_negocio = req.body;
    
    try {
        const result = await db.querySelect("INSERT INTO gen_area_negocio SET ?", [newPost]);    
        newPost.idGenAreaNegocio = result.insertId;
        return resp.status(201).json(newPost.idGenAreaNegocio);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Igen_area_negocio = req.body;
    
    let consulta = ("UPDATE gen_area_negocio SET ? WHERE idGenAreaNegocio = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Area de negocio actualizada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("UPDATE gen_area_negocio SET estatus=0 WHERE idGenAreaNegocio = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Area de negocio eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}
import { json, Request, Response } from "express";
import db from "../../database";
import { Igen_centro_costos, Igen_empre_cc_gerencia } from "../../interfaces/generales/generales.interface";

export const SelectREcord = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM gen_centro_costos where estatus=1";
    const Id = req.params.Id;
    if (Id!="NULL"){
        consulta = consulta + " WHERE idGenCentroCostos=" + Id;
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

export const SelectRecordFilter = async (req: Request, resp: Response) => {
    let consulta = "SELECT cc.*, ecg.* FROM gen_centro_costos cc INNER JOIN gen_empre_cc_gerencia ecg ON cc.idGenCentroCostos = ecg.idGenCentroCostos ";
    let filtro = {         
        idGenCentroCostos: req.params.Id,        
        codigo: req.params.codigo,
        descripcion: req.params.descripcion,        
        IdComprasEmpresa: req.params.IdComprasEmpresa,
        idGerencia: req.params.idGerencia        
    }

    let where: string[] = [];
    
    if (filtro.idGenCentroCostos!="NULL" || filtro.codigo!="NULL" || filtro.descripcion!="NULL" || filtro.IdComprasEmpresa || filtro.idGerencia!="NULL"){        
        if (filtro.idGenCentroCostos!="NULL"){
           where.push( " cc.idGenCentroCostos =" + filtro.idGenCentroCostos);
        }

        if(filtro.descripcion!="NULL"){
            where.push( " LOWER(cc.descripcion) LIKE LOWER('%" + filtro.descripcion + "%')");
        }

        if(filtro.codigo!="NULL"){
            where.push( " LOWER(cc.codigo) LIKE LOWER('%" + filtro.codigo + "%')");
        }        

        if (filtro.IdComprasEmpresa!="NULL"){
            where.push( " ecg.IdComprasEmpresa = " + filtro.IdComprasEmpresa);
        }

        if (filtro.idGerencia!="NULL"){
            where.push( " ecg.idGerencia = " + filtro.idGerencia);
        }

        where.forEach(function(where, index) {
            if (index==0){
                consulta = consulta + " WHERE " + where;
            }else{
                if (filtro.IdComprasEmpresa!="NULL" && filtro.idGerencia!="NULL"){
                    consulta = consulta + " AND " + where;
                }else{
                    consulta = consulta + " OR " + where;
                }                
            }
        });        
    }
    consulta = consulta + " GROUP BY cc.idGenCentroCostos";
    console.log(consulta);
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

export const createRecordCcosto = async (req: Request, resp: Response) => {
    let newPost: Igen_centro_costos = req.body;
    
    try {
        const result = await db.querySelect("INSERT INTO gen_centro_costos SET ?", [newPost]);    
        newPost.idGenCentroCostos = result.insertId;
        return resp.status(201).json(newPost.idGenCentroCostos);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const empreccgerencia = async (req: Request, resp: Response) => {
    let newPost: Igen_empre_cc_gerencia = req.body;
    
    try {
        const result = await db.querySelect("INSERT INTO gen_empre_cc_gerencia SET ?", [newPost]);    
        newPost.idGenEmpreCcGeren = result.insertId;
        return resp.status(201).json(newPost.idGenEmpreCcGeren);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Igen_centro_costos = req.body;
    
    let consulta = ("UPDATE gen_centro_costos SET ? WHERE idGenCentroCostos = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Centro de costos actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("UPDATE gen_centro_costos SET where estatus=0 WHERE idGenCentroCostos = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Centro de costos eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}
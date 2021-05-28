import { json, Request, Response } from "express";
import db from "../../database";
import { Igen_empre_area_gerencia } from "../../interfaces/generales/generales.interface";

export const empresagerenciaarea = async (req: Request, resp: Response) => {
    let consulta = "SELECT 	gea.idGenEmpreAreaGeren, gea.IdComprasEmpresa,	(SELECT nombre_empresa FROM compras_empresa em WHERE em.IdComprasEmpresa = gea.IdComprasEmpresa) AS nombre_empresa,	gea.idConfigGerencia, (SELECT nombre FROM config_gerencias g WHERE g.idConfigGerencia = gea.idConfigGerencia) AS nombre_gerencia, gea.idGenAreaNegocio,	(SELECT nombre FROM gen_area_negocio a WHERE a.idGenAreaNegocio = gea.idGenAreaNegocio) AS nombre_area FROM  gen_empre_area_gerencia gea";    
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

export const consultaSiIngresado = async (req: Request, resp: Response) => {
    const consulta = "SELECT gea.* FROM gen_empre_area_gerencia gea WHERE gea.IdComprasEmpresa = ? AND gea.idConfigGerencia = ? AND gea.idGenAreaNegocio = ?";    
    const empre= req.params.empre;
    const geren= req.params.geren;
    const area= req.params.area;
    
    try {
        const result = await db.querySelect(consulta, [empre, geren, area]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const createRecord = async (req: Request, resp: Response) => {
    let newPost: Igen_empre_area_gerencia = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO gen_empre_area_gerencia SET ?", [newPost]);    
        newPost.idGenEmpreAreaGeren = result.insertId;
        return resp.status(201).json(newPost.idGenEmpreAreaGeren);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("DELETE FROM gen_empre_area_gerencia WHERE idGenEmpreAreaGeren = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Centro de costos eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}
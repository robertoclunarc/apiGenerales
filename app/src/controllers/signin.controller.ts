import { json, Request, Response } from "express";
import db from "../database";
import  { getJWT } from "./auth.controller";

export const createToken = async (req: Request, resp: Response) => {
    let usuario: string = req.params.login     
    
    try {
        const result = await db.querySelect("SELECT seg_usuarios.idSegUsuario,  CONCAT(seg_usuarios.primerNombre,' ',seg_usuarios.primerApellido) AS nombreApellidoUser,  seg_usuarios.usuario, seg_usuarios.contrasenia, seg_usuarios.estatus,  seg_usuarios.idConfigCargo,  seg_usuarios.rutaImagen,  config_cargos.idConfigGerencia, GROUP_CONCAT(seg_roles_usuarios.idSegRol SEPARATOR '|') as roles  FROM  seg_usuarios   INNER JOIN config_cargos ON seg_usuarios.idConfigCargo = config_cargos.idConfigCargo LEFT JOIN seg_roles_usuarios ON seg_roles_usuarios.idSegUsuario = seg_usuarios.idSegUsuario WHERE seg_usuarios.usuario=? GROUP BY seg_usuarios.idSegUsuario", [usuario]);    
        console.log(result);
        if (!result.length){
            return resp.status(400).json('Usuario No Encontrado');
                   
        }else{
            let rset = result[0]; 
            //token
            req.idapp = rset.idSegUsuario;
            req.gerencia = rset.idConfigGerencia;
            req.cargo = rset.idConfigCargo;
            const roles = rset.roles.split('|').map( (n: any) => parseInt(n, 10));            
            req.rol = roles;
            let token: string = await getJWT(req, resp) as string; 
            
            resp.header('auth-token', token).json(rset);            
        }

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
};
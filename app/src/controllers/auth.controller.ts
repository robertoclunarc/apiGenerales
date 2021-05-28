import { Request, Response, NextFunction } from "express";
import db from "../database";
import jwt from "jsonwebtoken";
import { IPayload} from '../interfaces/util.interface'

function createJWT(idApp: number, cargo?: number, gerencia?: number, rol?: number[]) {
    return jwt.sign({ _id: idApp, _car: cargo, _ger: gerencia, _rol: rol }, process.env.JWT_SECRET || "secret", {
        expiresIn: 3600 * 24
    });
}

export const getJWT = async (req: Request, resp: Response) => {
    
    try {
        
        if (!req.idapp) {
            return resp.status(402).json({ msg: "No esta logueado" });
        }        
        const token: string = createJWT(req.idapp, req.cargo, req.gerencia, req.rol);

        return token;

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json('Es necesario el token de autenticación');    
    let lastError = null;
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || "secret") as IPayload ;
        req.userId = payload._id;
        req.cargo = payload._car;
        req.gerencia = payload._ger;
        req.rol = payload._rol;
        console.log(payload);
        next();
    } catch(error) {
        
        lastError = error;
        if (error.message !== 'invalid signature') {
            res.status(401).json(lastError);
        }
    }
}

export const getAuth = function(action: number) {
    return async (req: Request, res: Response, next: NextFunction) => {
    try {        
    if(req.rol) {
        //const roles = req.rol.split('|').map( n => parseInt(n, 10));
        if (req.rol.indexOf(action)<0) {
        return res.status(401).json({
            error: "No tienes permiso suficiente para realizar esta acción"
        });
        }
        next();
    }else{
        res.status(400).send({error: 'Acceso Denegado'});
    }
    } catch (error) {
    next(error)
    }
}
}
declare namespace Express {
    export interface Request {
        userId: string;
        idapp?: number;
        gerencia?:number;
        cargo?: number;
        rol?: number[];
    }
}
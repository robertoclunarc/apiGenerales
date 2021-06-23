export interface IProveedores {
    idProveedor?: number; 
    nombre: string; 
    rif: string; 
    direccion: string; 
    valoracion: number; 
    observaciones?: string; 
    telefono?: string; 
    contacto: string;
    formas_envio?: string;
    condiciones?: string; 
}

export interface IComprasEmpresa {
    IdComprasEmpresa?: number;
    nombre_empresa: string;
    rif: string;
    base_de_datos: string;
    fecha_ope: string;
    cerrada: number;
    direccion_fiscal?:string;
}

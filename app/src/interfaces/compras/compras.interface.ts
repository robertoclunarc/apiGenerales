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

export interface IAdm_productos {
    idAdmProducto?: number;
    codigo?:string; 
    nombre?:string; 
    uso?:string; 
    fechaAlta?:string; 
    idAdmGrupoProducto?: number;
    idAdmSubGrupoProducto?: number;
    idAdmUnidadMedida?: number;
    idAdmMaterialProducto?: number;
    responsableFuncionalidad?:string;
    responsableValidacion?:string;
    existenciaMaxima?: number;
    existenciaMinima?: number;
    puntoPedido?: number; 
    caducidad?: number; 
    reciclable?: number; 
    activo?: number;
    idAdmTipoDesagregacionProducto?: number;
    peligroso?: number;
    idUsuarioCreacion?: number;
    idUsuarioValidacion?: number; 
    idUsuarioModificacion?: number; 
    fechaAprobacion?:string;
    fechaModificacion?:string; 
    aprobado?: number; 
    esservicio?: number;
    validado?: number;
    idUsuarioValInfo?: number;
    fechaValInfo?:string;
    idGerenciaCreacion?: number;
    idGerenciaValidacion?: number; 
    idGerenciaModificacion?: number;
    idGerenciaAprobacion?: number;
    idPuestoAlmacen?: number; 
    ultimaModAlmacen?:string; 
    aprobadoAlmacen?:string; 
    idUsuarioAprobAlmacen?: number; 
    idUsuarioModAlmacen?: number; 
    fechaAproboAlmacen?:string;
}

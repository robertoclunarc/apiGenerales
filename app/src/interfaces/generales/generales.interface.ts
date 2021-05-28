export interface Igen_empre_area_gerencia{
    idGenEmpreAreaGeren?: number;
    idConfigGerencia: number;
    idGenAreaNegocio: number;
    IdComprasEmpresa:number;
}

export interface Igen_empresa{
    IdGenEmpresa?: number;
    nombre_empresa: string;
    rif?: string;
    base_de_datos: string;
    fecha_ope: string;
    cerrada: string;
    direccion_fiscal?: string;
}

export interface Igen_area_negocio{
    idGenAreaNegocio?: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    fechaAlta?: string;
    idAdmTipo?: number;
}

export interface Igen_centro_costos{
    idGenCentroCostos?: number;
    codigo?: string;
    fechaAlta?: string;
    descripcion: string;
    observaciones?: string;
}

export interface Igen_empre_cc_gerencia{
    idGenEmpreCcGeren?: number;
    idGerencia: number;
    idGenCentroCostos: number;
    IdComprasEmpresa: number;
}

export interface Igen_preguntas_gerencias{
    idPregunta?: number;
    descripcion: string;
    idConfigGerencia: number;
    fechaAlta?: string;
}

export interface Igen_respuestas_valoracion{
    idRespuesta?: number;
    idSegUsuario?: number;
    idPregunta?: number;
    valoracion_text?: string;
    valoracion?: number;
    idRefServicio?: number;
    fechaAlta?: string;
}
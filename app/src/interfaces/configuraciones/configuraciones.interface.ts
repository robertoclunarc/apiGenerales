export interface Iconfig_cargos{
    idConfigCargo?: number;
    nombre?: string;
    descripcion?: string;
    idConfigGerencia?: number;
}

export interface Iconfig_gerencias {
    idConfigGerencia?: number;
    nombre: string;
    descripcion?: string;
}

export interface Iconfig_ciudades {
    idConfigCiudad?: number;
    nombre: string;
    esCapital: number;
    idConfigEstado: number;
}

export interface Iconfig_estados{
    idConfigEstado?: number;
    nombre: string;
}

export interface Iconfig_municipios{
    idConfigMunicipio?:number;
    nombre: string;
    idConfigEstado:number;
}

export interface Iconfig_zonas_postales{
    idConfigZonaPostal?: number;
    nombre: string;
    idConfigEstado: number;
    codigoPostal?: string;
}

export interface Iconfig_parroquias{
    idConfigParroquia?:number;
    nombre: string;
    idConfigMunicipio: number;
}

export interface Iconfig_noticias{
    idConfigNoticia?: number;
    titulo: string;
    descripcion: string;
    fechaAlta: number;
    rutaImagen?: string;
    nombreImg?: string;
    activo: number;
}

export interface Iconfig_servicios_gerencias{
    idServiciosGerencias?: number;
    nombre: string;
    descripcion: string;
    idGerencia: number;
}

export interface Iconfig_parametros_sistemas{
    tiempoEsperaPanelNotificacion?: number;
    tiempoEsperaRecibirNotificacion?: number;
    dirServidor?: string;
    tiempoActualizacionRoles?: number;
}

export interface Iconfig_gerencias_temporales{
    idConfigGenTemp?:number;
    idSegUsuario:number;
    idConfigGerencia:number;
}

export interface Iconfig_activos_areas_negocios {
    idConfigActivoAreaNegocio?:number;
    idAdmActivo?:number;
    idGenAreaNegocio?:number;
    activo?:number;
}

export interface Iconfig_activos_gerencias {    
        idConfigActivoGcia?:number;
        idAdmActivo?:number;
        idConfigGerencia?:number;
        activo?:number;
}
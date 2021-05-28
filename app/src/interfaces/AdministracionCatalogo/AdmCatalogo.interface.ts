export interface Iadm_activos{
  idAdmActivo?: number;
  nombre: string;
  descripcion?: string;
  fechaAlta?: string;
  fechaModificacion?: string;
  serial?: string;
  idAdmProducto?: number;
  idComprasEmpresa?: number;
  tipo?: string;
  activo?: number;
  IdEmpresaPropietaria?: number;
  IdAreaNegocio?: number;
  IdactivoPadre?: number;
}



  
  
 

export interface Iadm_areas_trabajo{
    idAreaTrabajo?: number;
    nombre: string;
    orden?: number;
    fechaAlta?: string;
    idGenAreaNegocio: number
}
export interface Iusuarios {
    idSegUsuario?: number;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    fechaNacimiento: string;
    sexo: string;
    usuario: string;
    contrasenia: string;
    fechaAlta: string;
    foto?: string;
    estatus: string;
    estadoCivil: string;
    idConfigCargo?: number;
    rutaImagen: string;
    idGerencia?: number;
}
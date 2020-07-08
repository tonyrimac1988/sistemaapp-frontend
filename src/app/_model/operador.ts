import { Usuario } from './usuario'

export class Operador {

    nIdOperador: number;
    sNumDocu: string;
    sNombre: string;
    sApePaterno: string;
    sApeMaterno: string;
    dFechaNac: Date;
    sGenero: string;
    sObservacion: string;
    dFechaReg: Date;
    bActivo: boolean;
    nIdSesion: number;
    usuario: Usuario

}
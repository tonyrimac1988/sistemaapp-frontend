import { Usuario } from './usuario'

export class Sesion {

    nIdSesion: number;
    dFechaInicio: Date;
    dFechaFin: Date;
    sSistemaVersion: string;
    bActivo: boolean;
    dFechaReg: Date;
    usuario: Usuario;

}
import { Operador } from './operador'
export class Usuario{

    nIdUsuario: number;
    operador: Operador;
    sLogin: string;
    sPassword: string;
    dFechaReg: Date;
    bActivo: boolean;
    nIdSesion: number

}
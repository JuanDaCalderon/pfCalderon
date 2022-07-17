import { alumnosApi } from "./users";

export interface postClases {

}

export interface clases {
    clase: string;
    profesor: string;
    alumnos: alumnosApi[]
    id: string | number;
    cursoId: string | number;
}

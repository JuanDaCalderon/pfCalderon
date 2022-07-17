import { clases } from "./clases";

export interface postCurso {

}

export interface cursos {
    curso: string;
    id: string | number;
    clases: clases[];
}

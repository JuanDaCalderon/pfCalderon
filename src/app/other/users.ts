export interface User {
    email: string,
    password: string
}

export interface postUser {
    username: string,
    email: string,
    password: string,
    admin: boolean,
    phone: string
}

export interface alumnosApi {
    avatar: string;
    cursoId: number | string;
    firstName: string;
    LastName: string;
    middleName: string;
    id: string | number
}

export interface alumnosOutput {
    id: string | number;
    nombre: string;
    cursoId: number | string;
    avatar: string;
}

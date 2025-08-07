export interface User{
    uid:string
    email: string;
    nombre: string;
    apellido: string;
    displayName?: string;
    createdAt?: Date;
    isActive?: boolean;
}

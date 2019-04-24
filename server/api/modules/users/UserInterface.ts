export enum roles { developer, adminUser, user };

export interface IUser {    
    name: string;
    role: string;
    email: string;
    password: string;
}

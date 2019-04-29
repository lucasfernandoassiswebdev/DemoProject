import { Document, Schema, Model, model } from 'mongoose';

export interface IUsuario {
    nome: string;
    funcao: string;
    email: string;
    senha: string;
}

export interface IUsuarioMongoModel extends IUsuario, Document { };

export let UsuarioSchema: Schema = new Schema({
    dtCriacao: Date,
    nome: String,
    funcao: String,
    email: String,
    senha: String
});

export const UserModel: Model<IUsuarioMongoModel> = model<IUsuarioMongoModel>("Usuario", UsuarioSchema);

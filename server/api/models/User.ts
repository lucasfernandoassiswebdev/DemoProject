import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("User", { schema: "public" })
export class User {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id_user"
    })
    id: number;

    @Column("character varying", {
        nullable: false,
        length: 50,
        name: "nome"
    })
    nome: string;

    @Column("character varying", {
        nullable: false,
        length: 50,
        name: "email"
    })
    email: string;

    @Column("character varying", {
        nullable: false,
        length: 100,
        name: "password"
    })
    password: string;

    @Column("character varying", {
        nullable: false,
        length: 11,
        name: "cpf"
    })
    cpf: string;

    @Column("date", {
        nullable: false,
        name: "dt_criacao"
    })
    dtCriacao: Date;
}

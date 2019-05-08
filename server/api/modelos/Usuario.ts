import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Usuario")
export class Usuario {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id_usuario"
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
        name: "senha"
    })
    senha: string;

    @Column("character varying", {
        nullable: false,
        length: 11,
        name: "cpf"
    })
    cpf: string;
}

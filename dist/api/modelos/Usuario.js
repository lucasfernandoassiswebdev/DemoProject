"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Usuario = class Usuario {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        type: "int",
        name: "id_usuario"
    })
], Usuario.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("character varying", {
        nullable: false,
        length: 50,
        name: "nome"
    })
], Usuario.prototype, "nome", void 0);
__decorate([
    typeorm_1.Column("character varying", {
        nullable: false,
        length: 50,
        name: "email"
    })
], Usuario.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("character varying", {
        nullable: false,
        length: 100,
        name: "senha"
    })
], Usuario.prototype, "senha", void 0);
__decorate([
    typeorm_1.Column("character varying", {
        nullable: false,
        length: 11,
        name: "cpf"
    })
], Usuario.prototype, "cpf", void 0);
Usuario = __decorate([
    typeorm_1.Entity("Usuario")
], Usuario);
exports.Usuario = Usuario;

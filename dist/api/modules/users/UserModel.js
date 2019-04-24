"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
exports.UserSchema = new mongoose_1.Schema({
    createdAt: Date,
    name: String,
    role: String,
    email: String,
    password: String
});
exports.UserModel = mongoose_1.model("User", exports.UserSchema);

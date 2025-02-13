"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const zod_1 = require("zod");
const userValidation = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.validation = {
    userValidation,
};

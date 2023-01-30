"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConstants = exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: `${process.env.JWT_SECRET}`,
};
exports.dbConstants = {
    DATABASE_TYPE: `${process.env.DATABASE_TYPE}`,
    DATABASE_HOST: `${process.env.DATABASE_HOST}`,
    DATABASE_PORT: Number(`${process.env.DATABASE_PORT}`),
    DATABASE_USER: `${process.env.DATABASE_USER}`,
    DATABASE_PASSWORD: `${process.env.DATABASE_PASSWORD}`,
    DATABASE_NAME: process.env.DATABASE_NAME,
};
//# sourceMappingURL=constants.js.map
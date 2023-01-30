"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("../../models/create-user.dto");
const users_entity_1 = require("../../entities/users/users.entity");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createUser(response, user) {
        const newUser = await this.usersService.createUser(user);
        if (!!newUser) {
            return response.status(common_1.HttpStatus.CREATED).json({
                success: 'User created successfully',
            });
        }
        else {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                failed: 'User creation failed',
            });
        }
    }
    async fetchAll(response) {
        const users = await this.usersService.findAll();
        return response.status(common_1.HttpStatus.OK).json({
            users,
        });
    }
    async findById(response, id) {
        const user = await this.usersService.findOne(id);
        if (!!user) {
            return response.status(common_1.HttpStatus.OK).json({
                firstname: user.firstName,
                lastname: user.lastName,
                email: user.email,
                phonenumber: user.phoneNumber,
            });
        }
        else {
            return response.status(common_1.HttpStatus.NOT_FOUND).json({});
        }
    }
    async login(response, user) {
        const _user = await this.usersService.login(user.username, user.password);
        if (!!_user) {
            return response.status(common_1.HttpStatus.OK).json({
                status: 'Loggedin successfully',
                firstname: _user.firstName,
                lastname: _user.lastName,
                email: _user.email,
                phonenumber: _user.phoneNumber,
            });
        }
        else {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: 'Loggedin failed',
            });
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "fetchAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map
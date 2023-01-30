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
exports.OffersController = void 0;
const common_1 = require("@nestjs/common");
const offers_entity_1 = require("../../entities/offers/offers.entity");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const offers_service_1 = require("./offers.service");
let OffersController = class OffersController {
    constructor(offerService) {
        this.offerService = offerService;
    }
    async createCategory(response, offer) {
        const newCategory = await this.offerService.createOffer(offer);
        if (!!newCategory) {
            return response.status(common_1.HttpStatus.CREATED).json({
                success: 'Offer created successfully',
            });
        }
        else {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                failed: 'Offer creation failed',
            });
        }
    }
    async fetchAll(response) {
        const offers = await this.offerService.findAll();
        return response.status(common_1.HttpStatus.OK).json({
            offers,
        });
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, offers_entity_1.Offer]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "fetchAll", null);
OffersController = __decorate([
    (0, common_1.Controller)('offers'),
    __metadata("design:paramtypes", [offers_service_1.OffersService])
], OffersController);
exports.OffersController = OffersController;
//# sourceMappingURL=offers.controller.js.map
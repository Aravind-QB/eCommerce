"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        forbidUnknownValues: false,
    }));
    app.use((0, helmet_1.default)());
    app.enableCors();
    app.use(cookieParser());
    await app.listen(process.env.PORT || 3000, function () {
        console.log('listening to port', process.env.PORT || 3000);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
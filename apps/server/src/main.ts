import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
import helmet from "helmet";

import { NODE_ENV } from "../config/app";
import { AppModule } from "./app.module";
import { setupSwagger } from "./utils/swagger/setup";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.use(helmet());
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT");

  if (configService.get<string>("NODE_ENV") === NODE_ENV.DEVELOPMENT) {
    setupSwagger(app);
  }

  await app.listen(port as number);
}

bootstrap();

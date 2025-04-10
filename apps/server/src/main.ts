import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
import * as fs from "fs";
import helmet from "helmet";
import { NODE_ENV } from "../config/app";
import { AppModule } from "./app.module";
import { setupSwagger } from "./utils/swagger/setup";

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync("./cert/key.pem"),
    cert: fs.readFileSync("./cert/cert.pem"),
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });

  app.enableCors({
    origin: ["http://localhost:3001", "https://localhost:3001"],
    credentials: true,
  });
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

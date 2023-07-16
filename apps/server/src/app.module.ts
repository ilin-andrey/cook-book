import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

import { AuthModule } from "~/auth/auth.module";
import { logger } from "~/middleware/logger.middleware";
import { DishesModule } from "~/resources/dishes/dishes.module";
import { IngredientsModule } from "~/resources/ingredients/ingredients.module";
import { RecipesModule } from "~/resources/recipes/recipes.module";
import { UsersModule } from "~/resources/users/users.module";

import { NODE_ENV } from "../config/app";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .required()
    .valid(...Object.values(NODE_ENV)),
  PORT: Joi.number().required(),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
  SHADOW_DATABASE_URL: Joi.string(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validationSchema,
    }),
    DishesModule,
    IngredientsModule,
    RecipesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes("*");
  }
}

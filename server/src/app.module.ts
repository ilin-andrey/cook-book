import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DishesController } from "~/components/dishes/dishes.controller";
import { DishesModule } from "~/components/dishes/dishes.module";
import { DishesService } from "~/components/dishes/dishes.service";
import { IngredientsModule } from "~/components/ingredients/ingredients.module";
import { logger } from "~/middleware/logger.middleware";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/.env.${
        process.env.NODE_ENV ? process.env.NODE_ENV : "local"
      }`,
    }),
    DishesModule,
    IngredientsModule,
  ],
  controllers: [AppController, DishesController],
  providers: [AppService, DishesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes("*");
  }
}

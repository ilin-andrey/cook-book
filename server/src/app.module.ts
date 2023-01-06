import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DishesModule } from "./dishes/dishes.module";
import { logger } from "./middleware/logger.middleware";
import { DishesController } from "./dishes/dishes.controller";
import { DishesService } from "./dishes/dishes.service";
import { IngredientsModule } from "./ingredients/ingredients.module";

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

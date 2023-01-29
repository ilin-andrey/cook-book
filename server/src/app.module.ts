import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DishesModule } from "~/components/dishes/dishes.module";
import { IngredientsModule } from "~/components/ingredients/ingredients.module";
import { RecipesModule } from "~/components/recipes/recipes.module";
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
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes("*");
  }
}

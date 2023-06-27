import { Module } from "@nestjs/common";

import { PrismaService } from "~/prisma.service";

import { RecipesController } from "./recipes.controller";
import { RecipesService } from "./recipes.service";

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, PrismaService],
})
export class RecipesModule {}

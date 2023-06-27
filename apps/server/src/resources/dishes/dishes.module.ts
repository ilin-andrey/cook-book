import { Module } from "@nestjs/common";

import { PrismaService } from "~/prisma.service";

import { DishesController } from "./dishes.controller";
import { DishesService } from "./dishes.service";

@Module({
  controllers: [DishesController],
  providers: [DishesService, PrismaService],
  exports: [DishesService],
})
export class DishesModule {}

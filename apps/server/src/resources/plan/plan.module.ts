import { Module } from "@nestjs/common";

import { PrismaService } from "~/prisma.service";

import { PlanController } from "./plan.controller";
import { PlanService } from "./plan.service";

@Module({
  controllers: [PlanController],
  providers: [PlanService, PrismaService],
  exports: [PlanService],
})
export class PlanModule {}

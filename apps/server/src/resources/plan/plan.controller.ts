import { Controller, Get, Query } from "@nestjs/common";
import { MealType } from "@prisma/client";

import { QueryDto } from "./dto/query.dto";
import { PlanService } from "./plan.service";

@Controller("plan")
export class PlanController {
  constructor(private svc: PlanService) {}

  @Get("generate")
  async generate(@Query() query: QueryDto) {
    const data = await this.svc.generateRandomDishesByParams({
      days: Number(query.days),
      people: Number(query.people),
      caloriesPerDay: Number(query.caloriesPerDay),
      mealTypes: [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER],
    });

    return { data };
  }
}

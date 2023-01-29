import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from "@nestjs/common";

import { JoiValidationPipe } from "~/pipes/validation.pipe";

import { Dish } from "./interfaces/dishes.interface";
import {
  CreateDishDto,
  CreateDishSchema,
  UpdateDishDto,
} from "./dto/dishes.dto";
import { DishesService } from "./dishes.service";

@Controller("dishes")
export class DishesController {
  constructor(private svc: DishesService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateDishSchema))
  async create(@Body() createDishDto: CreateDishDto): Promise<void> {
    this.svc.create(createDishDto);
  }

  @Get()
  async findAll(): Promise<Dish[]> {
    return this.svc.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Dish | undefined> {
    return this.svc.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDishDto: UpdateDishDto,
  ): Promise<void> {
    return this.svc.update(id, updateDishDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    return this.svc.delete(id);
  }
}

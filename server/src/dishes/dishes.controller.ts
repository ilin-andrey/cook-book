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

import { Dish } from "./interfaces/dishes.interface";
import {
  CreateDishDto,
  CreateDishSchema,
  UpdateDishDto,
} from "./dto/dishes.dto";
import { DishesService } from "./dishes.service";
import { JoiValidationPipe } from "../pipes/validation.pipe";

@Controller("dishes")
export class DishesController {
  constructor(private dishesSvc: DishesService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateDishSchema))
  async create(@Body() createDishDto: CreateDishDto): Promise<void> {
    this.dishesSvc.create(createDishDto);
  }

  @Get()
  async findAll(): Promise<Dish[]> {
    return this.dishesSvc.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Dish | undefined> {
    return this.dishesSvc.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDishDto: UpdateDishDto,
  ): Promise<void> {
    return this.dishesSvc.update(id, updateDishDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return `This action removes a #${id} dish`;
  }
}

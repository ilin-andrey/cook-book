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

import {
  CreateIngredientDto,
  CreateIngredientSchema,
  UpdateIngredientDto,
} from "./dtos/ingredients.dto";
import { IngredientsService } from "./ingredients.service";
import { Ingredient } from "./interfaces/ingredients.interface";

@Controller("ingredients")
export class IngredientsController {
  constructor(private svc: IngredientsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateIngredientSchema))
  async create(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<void> {
    this.svc.create(createIngredientDto);
  }

  @Get()
  async findAll(): Promise<Ingredient[]> {
    return this.svc.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Ingredient | undefined> {
    return this.svc.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ): Promise<void> {
    return this.svc.update(id, updateIngredientDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return `This action removes a #${id} dish`;
  }
}

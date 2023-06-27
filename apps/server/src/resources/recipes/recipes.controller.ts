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

import { CreateRecipeDto, CreateRecipeSchema } from "./dto/create-recipe.dto";
import { UpdateRecipeDto, UpdateRecipeSchema } from "./dto/update-recipe.dto";
import { RecipesService } from "./recipes.service";

@Controller("recipes")
export class RecipesController {
  constructor(private readonly svc: RecipesService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateRecipeSchema))
  async create(@Body() data: CreateRecipeDto) {
    const ret = await this.svc.create(data);
    return { success: true, data: ret };
  }

  @Get()
  async findAll() {
    const data = await this.svc.findAll();
    return {
      success: true,
      data,
    };
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const data = await this.svc.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Put(":id")
  @UsePipes(new JoiValidationPipe(UpdateRecipeSchema))
  async update(@Param("id") id: number, @Body() data: UpdateRecipeDto) {
    const ret = await this.svc.update({ where: { id }, data });
    return { success: true, data: ret };
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    await this.svc.remove({ id });
    return { success: true };
  }
}

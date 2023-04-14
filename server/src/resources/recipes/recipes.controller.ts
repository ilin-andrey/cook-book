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
  create(@Body() createRecipeDto: CreateRecipeDto) {
    const data = this.svc.create(createRecipeDto);
    return { success: true, data };
  }

  @Get()
  findAll() {
    return {
      success: true,
      data: this.svc.findAll(),
    };
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return {
      success: true,
      data: this.svc.findOne(id),
    };
  }

  @Put(":id")
  @UsePipes(new JoiValidationPipe(UpdateRecipeSchema))
  update(@Param("id") id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    const data = this.svc.update(id, updateRecipeDto);
    return { success: true, data };
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    this.svc.remove(id);
    return { success: true };
  }
}

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

import { CreateDto, CreateSchema } from "./dto/create.dto";
import { UpdateDto, UpdateSchema } from "./dto/update.dto";
import { IngredientsService } from "./ingredients.service";

@Controller("ingredients")
export class IngredientsController {
  constructor(private svc: IngredientsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateSchema))
  async create(@Body() createIngredientDto: CreateDto) {
    const data = this.svc.create(createIngredientDto);
    return { success: true, data };
  }

  @Get()
  async findAll() {
    const data = this.svc.findAll();
    return {
      success: true,
      data,
    };
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const data = this.svc.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Put(":id")
  @UsePipes(new JoiValidationPipe(UpdateSchema))
  async update(
    @Param("id") id: string,
    @Body() updateIngredientDto: UpdateDto,
  ) {
    const data = this.svc.update(id, updateIngredientDto);
    return { success: true, data };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    this.svc.remove(id);
    return { success: true };
  }
}

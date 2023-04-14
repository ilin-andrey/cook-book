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

import { DishesService } from "./dishes.service";
import { CreateDto, CreateSchema } from "./dto/create.dto";
import { UpdateDto, UpdateSchema } from "./dto/update.dto";

@Controller("dishes")
export class DishesController {
  constructor(private svc: DishesService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateSchema))
  async create(@Body() createDishDto: CreateDto) {
    const data = this.svc.create(createDishDto);
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
  async update(@Param("id") id: string, @Body() updateDishDto: UpdateDto) {
    const data = this.svc.update(id, updateDishDto);
    return { success: true, data };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    this.svc.remove(id);
    return { success: true };
  }
}

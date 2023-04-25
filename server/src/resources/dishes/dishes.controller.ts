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
    const data = await this.svc.create(createDishDto);
    return { success: true, data };
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
  @UsePipes(new JoiValidationPipe(UpdateSchema))
  async update(@Param("id") id: number, @Body() data: UpdateDto) {
    const ret = await this.svc.update({ where: { id }, data });
    return { success: true, data: ret };
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    await this.svc.remove({ id });
    return { success: true };
  }
}

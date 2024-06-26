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
    return { data };
  }

  @Get()
  async findAll() {
    const data = await this.svc.findAll();
    return { data };
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const data = await this.svc.findOne(Number(id));
    return { data };
  }

  @Put(":id")
  @UsePipes(new JoiValidationPipe(UpdateSchema))
  async update(@Param("id") id: string, @Body() data: UpdateDto) {
    const ret = await this.svc.update({ where: { id: Number(id) }, data });
    return { data: ret };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.svc.remove({ id: Number(id) });
    return { success: true };
  }
}

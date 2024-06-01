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
  async create(@Body() data: CreateDto) {
    const ret = await this.svc.create(data);
    return { data: ret };
  }

  @Get()
  async findAll() {
    const data = await this.svc.findAll();
    return { data };
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const data = await this.svc.findOne(id);
    return { data };
  }

  @Put(":id")
  @UsePipes(new JoiValidationPipe(UpdateSchema))
  async update(@Param("id") id: number, @Body() data: UpdateDto) {
    const ret = await this.svc.update({ where: { id }, data });
    return { data: ret };
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    await this.svc.remove({ id });
    return { success: true };
  }
}

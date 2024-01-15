import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto, CreateTransactionDto } from './materials.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/types/role';
import { Public } from 'src/decorators/public.decorator';

@Controller('')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get('materials')
  findAll() {
    return this.materialsService.findAll();
  }

  @Roles([Role.Admin, Role.Owner])
  @Get('materials/:id')
  findOne(@Param('id') id: number) {
    return this.materialsService.findOne(id);
  }

  @Roles([Role.Admin, Role.Owner])
  @Post('materials')
  create(@Body() dto: CreateMaterialDto) {
    return this.materialsService.create(dto);
  }

  @Roles([Role.Admin, Role.Owner])
  @Put('materials/:id')
  update(@Param('id') id: number, @Body() dto: CreateMaterialDto) {
    return this.materialsService.update(id, dto);
  }

  @Roles([Role.Admin, Role.Owner])
  @Delete('materials/:id')
  remove(@Param() id: number) {
    return this.materialsService.remove(id);
  }

  @Public()
  @Get('materials-transactions')
  findAllTransactions() {
    return this.materialsService.findAllTransactions();
  }

  @Get('materials-transactions/:id')
  findOneTransaction(@Param('id') id: number) {
    return this.materialsService.findOneTransaction(id);
  }

  @Post('materials-transactions')
  addTransaction(@Body() dto: CreateTransactionDto) {
    return this.materialsService.createTransaction(dto);
  }
}

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
import { Role } from 'src/types/enums';
import { Public } from 'src/decorators/public.decorator';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Public()
  @Get('transactions')
  findAllTransactions() {
    return this.materialsService.findAllTransactions();
  }

  @Get('transactions/:id')
  findOneTransaction(@Param('id') id: number) {
    return this.materialsService.findOneTransaction(id);
  }

  @Post('transactions')
  addTransaction(@Body() dto: CreateTransactionDto) {
    return this.materialsService.createTransaction(dto);
  }

  @Get('')
  findAll() {
    return this.materialsService.findAll();
  }

  @Roles([Role.Admin, Role.Owner])
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.materialsService.findOne(id);
  }

  @Roles([Role.Admin, Role.Owner])
  @Post('')
  create(@Body() dto: CreateMaterialDto) {
    return this.materialsService.create(dto);
  }

  @Roles([Role.Admin, Role.Owner])
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateMaterialDto) {
    return this.materialsService.update(id, dto);
  }

  @Roles([Role.Admin, Role.Owner])
  @Delete(':id')
  remove(@Param() id: number) {
    return this.materialsService.remove(id);
  }
}

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

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.materialsService.findOne(id);
  }

  @Post('')
  create(@Body() dto: CreateMaterialDto) {
    return this.materialsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateMaterialDto) {
    return this.materialsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param() id: number) {
    return this.materialsService.remove(id);
  }
}

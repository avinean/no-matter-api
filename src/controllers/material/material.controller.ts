import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto, CreateTransactionDto } from './material.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';

@ApiTags('Material')
@SetMetadata('resource', Resource.material)
@Controller(Resource.material)
export class MaterialController {
  constructor(private readonly materialsService: MaterialService) {}

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

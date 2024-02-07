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
import { ClientService } from './client.service';
import { CreateClientDto } from './client.dto';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';

@ApiTags('Client')
@SetMetadata('resource', Resource.client)
@Controller(Resource.client)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('')
  async findAll() {
    return await this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientService.findOne(id);
  }

  @Post('')
  async create(@Body() dto: CreateClientDto) {
    return this.clientService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateClientDto) {
    return this.clientService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param() id: number) {
    return this.clientService.remove(id);
  }

  @Put(':id/status')
  setStatus(@Param('id') id: number, @Body('status') status: boolean) {
    return this.clientService.setStatus(id, status);
  }
}

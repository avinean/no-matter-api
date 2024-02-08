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

  @Get(':bussinessObjectId')
  async findAll(@Param('bussinessObjectId') bussinessObjectId: number) {
    return await this.clientService.findAll({
      bussinessObjects: [{ id: bussinessObjectId }],
    });
  }

  @Post(':bussinessObjectId')
  async create(
    @Param('bussinessObjectId') bussinessObjectId: number,
    @Body() dto: CreateClientDto,
  ) {
    return this.clientService.create({
      ...dto,
      bussinessObjects: [{ id: bussinessObjectId }],
    });
  }

  @Put(':bussinessObjectId/:id')
  update(
    @Param('id') id: number,
    @Param('bussinessObjectId') bussinessObjectId: number,
    @Body() dto: CreateClientDto,
  ) {
    return this.clientService.update(
      {
        id,
        bussinessObjects: [{ id: bussinessObjectId }],
      },
      dto,
    );
  }
}

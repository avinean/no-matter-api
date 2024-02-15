import {
  Body,
  Controller,
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

  @Get(':businessObjectId')
  async findAll(@Param('businessObjectId') businessObjectId: number) {
    return await this.clientService.findAll({
      businessObjects: [{ id: businessObjectId }],
    });
  }

  @Post(':businessObjectId')
  async create(
    @Param('businessObjectId') businessObjectId: number,
    @Body() dto: CreateClientDto,
  ) {
    return this.clientService.create({
      ...dto,
      businessObjects: [{ id: businessObjectId }],
    });
  }

  @Put(':businessObjectId/:id')
  update(
    @Param('id') id: number,
    @Param('businessObjectId') businessObjectId: number,
    @Body() dto: CreateClientDto,
  ) {
    return this.clientService.update(
      {
        id,
        businessObjects: [{ id: businessObjectId }],
      },
      dto,
    );
  }
}

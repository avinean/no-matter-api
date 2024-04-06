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
import { User } from 'src/decorators/user.decorator';
import { UserMeta } from 'src/types/common';

@ApiTags('Client')
@SetMetadata('resource', Resource.client)
@Controller(Resource.client)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAll(@User() user: UserMeta) {
    return await this.clientService.findAll({
      businessObjects: [{ id: user.objid }],
    });
  }

  @Post()
  async create(@User() user: UserMeta, @Body() dto: CreateClientDto) {
    return this.clientService.create({
      ...dto,
      businessObjects: [{ id: user.objid }],
    });
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @User() user: UserMeta,
    @Body() dto: CreateClientDto,
  ) {
    return this.clientService.update(
      {
        id,
        businessObjects: [{ id: user.objid }],
      },
      dto,
    );
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { BussinessObjectService } from './bussiness-object.service';
import { CreateBussinessObjectDto } from './bussiness-object.dto';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';

@ApiTags('Bussiness Object')
@SetMetadata('resource', Resource.bussinessObject)
@Controller(Resource.bussinessObject)
export class BussinessObjectController {
  constructor(private readonly objectService: BussinessObjectService) {}

  @Get(':profileId/:bussinessId')
  async findAll(
    @Param('profileId') profileId: number,
    @Param('bussinessId') bussinessId: number,
  ) {
    return await this.objectService.findAll(profileId, bussinessId);
  }

  @Post(':profileId/:bussinessId')
  create(
    @Body() body: CreateBussinessObjectDto,
    @Param('profileId') profileId: number,
    @Param('bussinessId') bussinessId: number,
  ) {
    return this.objectService.create(body, profileId, bussinessId);
  }
}

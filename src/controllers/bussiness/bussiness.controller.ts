import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { BussinessService } from './bussiness.service';
import { CreateBussinessDto } from './bussiness.dto';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';

@ApiTags('Bussiness')
@SetMetadata('resource', Resource.bussiness)
@Controller(Resource.bussiness)
export class BussinessController {
  constructor(private readonly bussinessService: BussinessService) {}

  @Get(':profileId')
  async findAll(@Param('profileId') profileId: number) {
    return await this.bussinessService.findAll(profileId);
  }

  @Post(':profileId')
  create(
    @Body() body: CreateBussinessDto,
    @Param('profileId') profileId: number,
  ) {
    return this.bussinessService.create(body, profileId);
  }
}

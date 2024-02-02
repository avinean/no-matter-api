import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BussinessObjectService } from './bussiness-object.service';
import { CreateBussinessObjectDto } from './bussiness-object.dto';

@Controller('bussiness-object')
export class BussinessObjectController {
  constructor(private readonly objectService: BussinessObjectService) {}

  @Get(':profileId/:bussinessId')
  async getAll(
    @Param('profileId') profileId: number,
    @Param('bussinessId') bussinessId: number,
  ) {
    return await this.objectService.getAll(profileId, bussinessId);
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

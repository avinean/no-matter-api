import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BussinessService } from './bussiness.service';
import { CreateBussinessDto } from './bussiness.dto';

@Controller('bussiness')
export class BussinessController {
  constructor(private readonly bussinessService: BussinessService) {}

  @Get(':profileId')
  async getAll(@Param('profileId') profileId: number,) {
    return await this.bussinessService.getAll(profileId);
  }

  @Post(':profileId')
  create(
    @Body() body: CreateBussinessDto,
    @Param('profileId') profileId: number,
  ) {
    return this.bussinessService.create(body, profileId);
  }
}

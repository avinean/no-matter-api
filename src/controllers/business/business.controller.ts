import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './business.dto';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';

@ApiTags('Business')
@SetMetadata('resource', Resource.business)
@Controller(Resource.business)
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get(':profileId')
  async findAll(@Param('profileId') profileId: number) {
    return await this.businessService.findAll(profileId);
  }

  @Post(':profileId')
  create(
    @Body() body: CreateBusinessDto,
    @Param('profileId') profileId: number,
  ) {
    return this.businessService.create(body, profileId);
  }

  @Put(':profileId/:businessId')
  update(
    @Body() body: CreateBusinessDto,
    @Param('businessId') businessId: number,
  ) {
    return this.businessService.update(body, businessId);
  }
}

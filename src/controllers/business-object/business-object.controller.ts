import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { BusinessObjectService } from './business-object.service';
import { CreateBusinessObjectDto } from './business-object.dto';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';

@ApiTags('Business Object')
@SetMetadata('resource', Resource.businessObject)
@Controller(Resource.businessObject)
export class BusinessObjectController {
  constructor(private readonly objectService: BusinessObjectService) {}

  @Get(':profileId/:businessId')
  async findAll(
    @Param('profileId') profileId: number,
    @Param('businessId') businessId: number,
  ) {
    return await this.objectService.findAll(profileId, businessId);
  }

  @Post(':profileId/:businessId')
  create(
    @Body() body: CreateBusinessObjectDto,
    @Param('profileId') profileId: number,
    @Param('businessId') businessId: number,
  ) {
    return this.objectService.create(body, profileId, businessId);
  }
}

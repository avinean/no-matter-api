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

  @Post()
  create(@Body() body: CreateBusinessDto) {
    return this.businessService.create(body);
  }

  @Put(':id')
  update(@Body() body: CreateBusinessDto, @Param('id') id: number) {
    return this.businessService.update(id, body);
  }
}

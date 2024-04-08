import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  SetMetadata,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './business.dto';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';
import { ProfileService } from '../profile/profile.service';
import { UserMeta } from 'src/types/common';
import { User } from 'src/decorators/user.decorator';
import { SkipPermission } from 'src/decorators/permission.decorator';

@ApiTags('Business')
@SetMetadata('resource', Resource.business)
@Controller(Resource.business)
export class BusinessController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly profileService: ProfileService,
  ) {}

  @Post()
  async create(@Body() body: CreateBusinessDto, @User() user: UserMeta) {
    const business = await this.businessService.create(body);
    return this.profileService.assignBusiness(user.pub, business.id);
  }

  @Put(':id')
  update(@Body() body: CreateBusinessDto, @Param('id') id: number) {
    return this.businessService.update(id, body);
  }

  @SkipPermission()
  @Put(':id/primary')
  async primary(@Param('id') id: number, @User() user: UserMeta) {
    const business = await this.businessService.findOne({ where: { id } });
    return this.profileService.update(
      { id: user.pub },
      {
        primaryBusiness: { id },
        primaryBusinessObject: business.businessObjects?.length
          ? { id: business.businessObjects[0].id }
          : null,
      },
    );
  }
}

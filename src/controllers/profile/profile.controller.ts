import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';
import { ProfileService } from './profile.service';
import { SkipPermission } from 'src/decorators/permission.decorator';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';

@ApiTags('Profile')
@SetMetadata('resource', Resource.profile)
@Controller(Resource.profile)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @SkipPermission()
  @Get('me')
  findMe(@Req() req) {
    return this.profileService.findMe(req.user.sub);
  }

  @Get(':bussinessObjectId')
  findAll(@Param('bussinessObjectId') bussinessObjectId: number) {
    return this.profileService.findAll({
      where: { employers: { id: bussinessObjectId } },
      relations: ['services', 'roles'],
    });
  }

  @Post(':bussinessObjectId')
  create(
    @Body() dto: CreateProfileDto,
    @Param('bussinessObjectId') bussinessObjectId: number,
  ) {
    return this.profileService.create(dto, bussinessObjectId);
  }

  @Put(':bussinessObjectId/:id')
  update(
    @Param('id') id: number,
    @Param('bussinessObjectId') bussinessObjectId: number,
    @Body()
    userDTO: UpdateProfileDto,
  ) {
    return this.profileService.update(bussinessObjectId, id, userDTO);
  }
}

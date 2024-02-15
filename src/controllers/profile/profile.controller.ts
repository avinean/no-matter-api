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

  @Get(':businessObjectId')
  findAll(@Param('businessObjectId') businessObjectId: number) {
    return this.profileService.findAll({
      where: { employers: { id: businessObjectId } },
      relations: {
        services: true,
        roles: true,
      },
    });
  }

  @Post(':businessObjectId')
  create(
    @Body() dto: CreateProfileDto,
    @Param('businessObjectId') businessObjectId: number,
  ) {
    return this.profileService.create({
      ...dto,
      employers: [{ id: businessObjectId }],
    });
  }

  @Put(':businessObjectId/:id')
  update(
    @Param('id') id: number,
    @Param('businessObjectId') businessObjectId: number,
    @Body() userDTO: UpdateProfileDto,
    @Req() req,
  ) {
    return this.profileService.update(
      [
        { id, employers: [{ id: businessObjectId }] },
        { id, user: { id: req.user.sub } },
      ],
      userDTO,
    );
  }
}

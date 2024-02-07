import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';
import { ProfileService } from './profile.service';
import { Roles } from 'src/decorators/role.decorator';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';

@ApiTags('Profile')
@Controller(Resource.profile)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Roles(['*'])
  @Get('me')
  findMe(@Req() req) {
    console.log('req.user.sub', req.user.sub);
    return this.profileService.findMe(req.user.sub);
  }

  @Get(':bussinessObjectId')
  findAll(@Param('bussinessObjectId') bussinessObjectId: number) {
    return this.profileService.findAllProfiles(bussinessObjectId);
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

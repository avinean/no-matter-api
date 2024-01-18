import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Roles } from 'src/decorators/role.decorator';
import { Role, ContactType } from 'src/types/enums';
import { CreateProfileDto } from './profiles.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('')
  findAll() {
    return this.profilesService.findAll();
  }

  @Roles([Role.Admin, Role.Owner])
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.profilesService.findOne(id);
  }

  @Roles([Role.Admin, Role.Owner])
  @Post('')
  async create(@Body() { emails, phones, ...dto }: CreateProfileDto) {
    const profile = await this.profilesService.create(dto);
    const contacts = await this.profilesService.addContacts(profile.id, [
      ...emails.map((email) => ({ type: ContactType.Email, value: email })),
      ...phones.map((phone) => ({ type: ContactType.Phone, value: phone })),
    ]);

    return { ...profile, contacts };
  }

  @Roles([Role.Admin, Role.Owner])
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateProfileDto) {
    return this.profilesService.update(id, dto);
  }

  @Roles([Role.Admin, Role.Owner])
  @Delete(':id')
  remove(@Param() id: number) {
    return this.profilesService.remove(id);
  }
}

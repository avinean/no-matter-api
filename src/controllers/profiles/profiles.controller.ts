import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './profiles.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('')
  async findAll() {
    return await this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.profilesService.findOne(id);
  }

  @Post('')
  async create(@Body() dto: CreateProfileDto) {
    return this.profilesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateProfileDto) {
    return this.profilesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param() id: number) {
    return this.profilesService.remove(id);
  }

  @Post('photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async addAvatar(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }
}

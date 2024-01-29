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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './clients.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  @Get('')
  async findAll() {
    return await this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientService.findOne(id);
  }

  @Post('')
  async create(@Body() dto: CreateClientDto) {
    return this.clientService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateClientDto) {
    return this.clientService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param() id: number) {
    return this.clientService.remove(id);
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

  @Put(':id/status')
  setStatus(@Param('id') id: number, @Body('status') status: boolean) {
    return this.clientService.setStatus(id, status);
  }
}

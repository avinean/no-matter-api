import { Controller, Put } from '@nestjs/common';
import { Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { promisify } from 'util';
import * as fs from 'fs';
import { SkipPermission } from 'src/decorators/permission.decorator';

const unlinkAsync = promisify(fs.unlink);

@ApiTags('Util')
@Controller('util')
export class UtilController {
  @SkipPermission()
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

  @SkipPermission()
  @Put('photo/:name')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: async (req, file, cb) => {
          const oldFilePath = `./uploads/${req.params.name}`;

          try {
            await unlinkAsync(oldFilePath);
          } catch (error) {
            if (error.code !== 'ENOENT') {
              throw error;
            }
          }

          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          const newFileName = `${randomName}${extname(file.originalname)}`;
          const newFilePath = `./uploads/${newFileName}`;

          cb(null, newFileName);

          return newFilePath;
        },
      }),
    }),
  )
  async updateAvatar(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }
}

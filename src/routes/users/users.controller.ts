import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from 'src/routes/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne({ id });
  }

  @Post()
  create(@Body() userDTO: { username: string; password: string }) {
    return this.userService.create(userDTO);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body()
    userDTO: {
      username: string;
      password: string;
    },
  ) {
    return this.userService.update(id, userDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}

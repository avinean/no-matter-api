import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'example@email.com' })
  @IsEmail()
  email: string;
}

export class UpdateUserDTO extends CreateUserDto {}

export class FindUserDto {
  @ApiProperty({ example: '123' })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ example: 'user1' })
  @IsOptional()
  @IsString()
  email?: string;
}

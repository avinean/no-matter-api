import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  isEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role, Sex } from 'src/types/enums';

export class CreateUserDto {
  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'example@email.com' })
  @IsEmail()
  email: string;
}

export class UpdateUserDTO extends CreateUserDto {}

export class FindUserProfileDto {
  @ApiProperty({ example: '123' })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ example: '123' })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiProperty({ example: 'user1' })
  @IsOptional()
  @IsString()
  email?: string;
}

export class CreateUserProfileDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ enum: Sex })
  @IsEnum(Sex)
  sex: Sex;

  @ApiProperty({ example: '1990-01-01' })
  @IsString()
  birthday: Date;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  image: string;

  @ApiProperty({ example: 'user1' })
  @IsString()
  email: string;

  @ApiProperty({ example: '123456789' })
  @IsString()
  phone: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ example: ['admin', 'user'] })
  @IsArray()
  @IsString({ each: true })
  roles: Role[];
}

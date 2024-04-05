import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sex } from 'src/types/enums';
import { ServiceEntity } from 'src/controllers/service/service.entity';
import { RoleEntity } from 'src/controllers/role/role.entity';

export class FindProfileDto {
  @ApiProperty({ example: '123' })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ example: 'user1' })
  @IsOptional()
  @IsString()
  email?: string;
}

export class CreateProfileDto {
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

  @ApiProperty({ example: [] })
  @IsArray()
  services: ServiceEntity[];

  @ApiProperty({ example: ['admin', 'guest'] })
  @IsString()
  roles: RoleEntity[];
}

export class UpdateProfileDto extends CreateProfileDto {}

export class ResetPasswordDto {
  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  newPassword: string;
}

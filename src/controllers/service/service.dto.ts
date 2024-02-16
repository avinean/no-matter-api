import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import { ProfileEntity } from 'src/entities/profile.entity';
import { ServiceMaterialEntity } from 'src/entities/service-material.entity';
import { ServiceType } from 'src/types/enums';

export class CreateServiceDto {
  @ApiProperty({ example: 'Service Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Service Description' })
  @IsString()
  description: string;

  @ApiProperty({ enum: ServiceType })
  @IsEnum(ServiceType)
  type: ServiceType;

  @ApiProperty({ example: 100 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  duration: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  discount: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ type: [ProfileEntity] })
  @IsArray()
  materials: ServiceMaterialEntity[];
}

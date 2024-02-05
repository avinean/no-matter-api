import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
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
}

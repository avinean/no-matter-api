import { ApiProperty } from '@nestjs/swagger';

export class CreateBussinessDto {
  @ApiProperty({ example: 'Bussiness Name' })
  name: string;

  @ApiProperty({ example: 'Bussiness Description' })
  description: string;

  @ApiProperty({ example: 'image.png' })  
  image: string;
}
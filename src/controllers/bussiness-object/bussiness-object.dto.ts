import { ApiProperty } from '@nestjs/swagger';

export class CreateBussinessObjectDto {
  @ApiProperty({ example: 'Bussiness Object Name' })
  name: string;

  @ApiProperty({ example: 'Bussiness Object Description' })
  description: string;

  @ApiProperty({ example: 'image.png' })
  image: string;
}

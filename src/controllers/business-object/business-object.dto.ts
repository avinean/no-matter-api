import { ApiProperty } from '@nestjs/swagger';

export class CreateBusinessObjectDto {
  @ApiProperty({ example: 'Business Object Name' })
  name: string;

  @ApiProperty({ example: 'Business Object Description' })
  description: string;

  @ApiProperty({ example: 'image.png' })
  image: string;
}

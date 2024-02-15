import { ApiProperty } from '@nestjs/swagger';

export class CreateBusinessDto {
  @ApiProperty({ example: 'Business Name' })
  name: string;

  @ApiProperty({ example: 'Business Description' })
  description: string;

  @ApiProperty({ example: 'image.png' })
  image: string;
}

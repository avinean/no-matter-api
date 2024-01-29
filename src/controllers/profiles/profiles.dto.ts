import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { ContactType, Sex } from 'src/types/enums';

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
  @IsDate()
  birthday: Date;

  @ApiProperty({ example: 'https://example.com/' })
  @IsString()
  source: string;

  @ApiProperty({ example: '09123456789' })
  @IsNumber()
  balance: number;

  @ApiProperty({ example: '09123456789' })
  @IsNumber()
  cardId: number;

  @ApiProperty({ example: 'image.png' })
  @IsString()
  image: string;

  @ApiProperty({ example: '09123456789' })
  @IsString()
  phone: string;
}

export class CreateContactDto {
  @ApiProperty({ enum: ['email', 'phone'] })
  @IsEnum(ContactType)
  type: ContactType;

  @ApiProperty({ example: 'email@email.com' })
  @IsString()
  value: string;
}
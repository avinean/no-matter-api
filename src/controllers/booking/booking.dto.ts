import { IsArray, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceEntity } from 'src/entities/Services';
import { UserProfileEntity } from 'src/entities/User';
import { ClientEntity } from 'src/entities/Client';

export class CreateBookingDto {
  @ApiProperty({ example: '2023-01-01' })
  @IsString()
  date: string;

  @ApiProperty({ example: 1 })
  @IsString()
  duration: number;

  @ApiProperty({ example: '' })
  @IsString()
  coment: string;

  @ApiProperty({ example: [] })
  @IsArray()
  services: ServiceEntity[];

  @ApiProperty({ example: {} })
  @IsObject()
  profile: UserProfileEntity;

  @ApiProperty({ example: {} })
  @IsObject()
  client: ClientEntity;
}

export class SearchProfilesDto {
  @ApiProperty({ example: [] })
  @IsArray()
  services: ServiceEntity[];
}

export class SearchServicesDto {
  @ApiProperty({ example: UserProfileEntity })
  @IsObject()
  profile: UserProfileEntity;
}

export class SearchTimeslotsDto {
  @ApiProperty({ example: UserProfileEntity })
  @IsObject()
  profile: UserProfileEntity;

  @ApiProperty({ example: '2023-01-01' })
  @IsString()
  date: string;

  @ApiProperty({ example: 1 })
  @IsString()
  duration: number;
}

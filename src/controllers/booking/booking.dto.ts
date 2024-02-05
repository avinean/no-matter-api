import { IsArray, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceEntity } from 'src/entities/service.entity';
import { ProfileEntity } from 'src/entities/profile.entity';
import { ClientEntity } from 'src/entities/client.entity';

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
  profile: ProfileEntity;

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
  @ApiProperty({ example: ProfileEntity })
  @IsObject()
  profile: ProfileEntity;
}

export class SearchTimeslotsDto {
  @ApiProperty({ example: ProfileEntity })
  @IsObject()
  profile: ProfileEntity;

  @ApiProperty({ example: '2023-01-01' })
  @IsString()
  date: string;

  @ApiProperty({ example: 1 })
  @IsString()
  duration: number;
}

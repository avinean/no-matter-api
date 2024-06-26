import { IsArray, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceEntity } from 'src/controllers/service/service.entity';
import { ProfileEntity } from 'src/controllers/profile/profile.entity';

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

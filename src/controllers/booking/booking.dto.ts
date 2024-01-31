import { IsArray, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceEntity } from 'src/entities/Services';
import { UserProfileEntity } from 'src/entities/User';

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

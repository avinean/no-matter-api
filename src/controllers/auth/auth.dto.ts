import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'user1' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;
}

export class SignUpDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '123456789' })
  @IsString()
  phone: string;
}

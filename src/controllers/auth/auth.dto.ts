import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'user1' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;
}

export class SignUpDto {
  @ApiProperty({ example: 'example@email.com' })
  @IsEmail()
  email: string;
}

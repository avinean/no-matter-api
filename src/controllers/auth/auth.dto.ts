import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'user1' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;
}

export class SignUpDto {
  @ApiProperty({ example: 'example@email.com' })
  @IsEmail()
  email: string;
}

export class SetNewPasswordDto {
  @ApiProperty({ example: 'a65sd65avasvd65a7sd5as' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'user1' })
  @IsString()
  username: string;
}

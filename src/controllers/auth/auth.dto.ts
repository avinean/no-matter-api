import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'user1@email.com' })
  @IsString()
  email?: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password?: string;

  id: number
}

export class SignUpDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'user1@email.com' })
  @IsString()
  email: string;
}

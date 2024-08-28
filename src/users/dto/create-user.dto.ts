import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'User name' })
  readonly nome: string;

  @IsEmail()
  @ApiProperty({ description: 'User email' })
  readonly email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ description: 'User password' })
  readonly senha: string;
}
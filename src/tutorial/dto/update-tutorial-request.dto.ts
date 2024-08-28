import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TutorialRequest {
  @ApiProperty({
    description: 'Title of the tutorial',
    maxLength: 255,
    example: 'Introduction to NestJS'
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  titulo?: string;

  @ApiProperty({
    description: 'Content of the tutorial',
    example: 'This tutorial covers the basics of creating a NestJS application.'
  })
  @IsOptional()
  @IsString()
  conteudo?: string;
}
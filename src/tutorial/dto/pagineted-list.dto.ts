import { IsOptional, IsNumber, IsString, IsDateString, Min } from 'class-validator';

export class PaginatedListDto {
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsNumber()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsDateString({}, { message: 'dataInicio must be a valid ISO 8601 date string' })
  dataInicio?: string;

  @IsOptional()
  @IsDateString({}, { message: 'dataFim must be a valid ISO 8601 date string' })
  dataFim?: string;
}
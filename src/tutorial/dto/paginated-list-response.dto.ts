import { ApiProperty } from '@nestjs/swagger';
import { Tutorial } from 'database/entities/tutorial.entity';

export class PaginatedResponseDto<T> {
  @ApiProperty({
    description: 'Array of data items',
    example: [
      {
        id: 1,
        titulo: 'Tutorial 1',
        conteudo: 'Content of tutorial 1',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
      },
    ],
  })
  data: T[];

  @ApiProperty({ description: 'Total number of items', example: 1 })
  total: number;

  @ApiProperty({ description: 'Current page number', example: 1 })
  page: number;

  @ApiProperty({ description: 'Number of items per page', example: 10 })
  limit: number;
}

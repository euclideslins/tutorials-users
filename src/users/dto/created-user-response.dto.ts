import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDto {
    @ApiProperty({
        description: 'Email do usuário criado',
        example: 'Test User',
    })
    email: string;

    @ApiProperty({
        description: 'Nome do usuario criado',
        example: 'Euclides',
    })
    nome: string;
}

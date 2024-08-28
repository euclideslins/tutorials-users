import { Usuario } from '../../../database/entities/usuario.entity';import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let repository: Repository<Usuario>;
  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    repository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should successfully create a new user', async () => {
      const createUserDto = {
        nome: 'Test User',
        email: 'test@example.com',
        senha: 'password123',
      };
  
    
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockImplementation((user) => {
        return Promise.resolve({ ...user });
      });
    
      await service.createUser(createUserDto);
    
      expect(mockRepository.create).toHaveBeenCalledWith({
        nome: createUserDto.nome,
        email: createUserDto.email,
        senha: expect.any(String), // passei como any expected pois o bcrypt faz o calculo da criptografia em parte em base na hora então, há alguns pequenos momentos de diferença e como o objetivo não é testar a transformação de fato optei deixar assim
      });
    });
    
    it('should throw BadRequestException if email is already in use', async () => {
      const createUserDto = {
        nome: 'Test User',
        email: 'test@example.com',
        senha: 'password123',
      };

      mockRepository.findOne.mockResolvedValue(createUserDto);

      await expect(service.createUser(createUserDto)).rejects.toThrow(BadRequestException);
    });
  });
});

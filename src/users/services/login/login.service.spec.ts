import { BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Usuario } from '../../../database/entities/usuario.entity';
import { Repository } from "typeorm";
import { LoginService } from "./login.service";
import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from 'bcrypt';


describe('LoginService', () => {
  let service: LoginService;
  let jwtService: JwtService;
  let mockUserRepository: Repository<Usuario>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockedJwtToken'),
          },
        },
        {
          provide: getRepositoryToken(Usuario),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    jwtService = module.get<JwtService>(JwtService);
    mockUserRepository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
  });

  describe('validateUser', () => {
    it('should return user data without password if validation is successful', async () => {
      const mockUser: Usuario = {
        id: 1,
        nome: 'Test User',
        email: 'test@example.com',
        senha: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    
      const result = await service.validateUser('test@example.com', 'password123');
    
      expect(result).toMatchObject({ id: 1, email: 'test@example.com', nome: 'Test User' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    });
    

    it('should return null if user is not found', async () => {
      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(null);

      const result = await service.validateUser('nonexistent@example.com', 'password123');

      expect(result).toBeNull();
    });

    it('should return null if password is incorrect', async () => {
      const mockUser: Usuario = {
        id: 1,
        nome: 'Test User',
        email: 'test@example.com',
        senha: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result = await service.validateUser('test@example.com', 'wrongPassword');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a JWT token if login is successful', async () => {
      const mockUser = {
        email: 'test@example.com',
        senha: 'password123',
        id: 1,
      };
      jest.spyOn(service, 'validateUser').mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        nome: 'Test User',
      });

      const result = await service.login(mockUser);

      expect(service.validateUser).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(result).toEqual({ access_token: 'mockedJwtToken' });
    });

    it('should throw BadRequestException if credentials are invalid', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      await expect(service.login({ email: 'wrong@example.com', senha: 'wrongPassword' }))
        .rejects
        .toThrow(BadRequestException);
    });
  });
});

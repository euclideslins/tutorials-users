import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { LoginService } from './services/login/login.service';
import { CreateUserService } from './services/create-user/create-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { CreateUserResponseDto } from './dto/created-user-response.dto';
import { BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let authService: LoginService;
  let createUserService: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: LoginService,
          useValue: {
            login: jest.fn(),
          },
        },
        {
          provide: CreateUserService,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    authService = module.get<LoginService>(LoginService);
    createUserService = module.get<CreateUserService>(CreateUserService);
  });

  describe('login', () => {
    it('should return a JWT token if login is successful', async () => {
      const loginDto: UserLoginDto = { email: 'test@example.com', senha: 'password123' };
      const result = { access_token: 'jwt_token' };

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await controller.login(loginDto)).toEqual(result);
    });

    it('should throw BadRequestException if login fails', async () => {
      const loginDto: UserLoginDto = { email: 'test@example.com', senha: 'wrong_password' };

      jest.spyOn(authService, 'login').mockRejectedValue(new BadRequestException('Invalid credentials'));

      await expect(controller.login(loginDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('createUser', () => {
    it('should create a new user and return the response', async () => {
      const createUserDto: CreateUserDto = { nome: 'Test User', email: 'test@example.com', senha: 'password123' };
      const result: CreateUserResponseDto = { nome: 'Test User', email: 'test@example.com' };

      jest.spyOn(createUserService, 'createUser').mockResolvedValue(result);

      expect(await controller.createUser(createUserDto)).toEqual(result);
    });

    it('should throw BadRequestException if user creation fails', async () => {
      const createUserDto: CreateUserDto = { nome: 'Test User', email: 'test@example.com', senha: 'password123' };

      jest.spyOn(createUserService, 'createUser').mockRejectedValue(new BadRequestException('Email already in use'));

      await expect(controller.createUser(createUserDto)).rejects.toThrow(BadRequestException);
    });
  });
});

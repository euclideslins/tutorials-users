import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponseDto } from './dto/created-user-response.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { LoginService } from './services/login/login.service';
import { CreateUserService } from './services/create-user/create-user.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: LoginService,
    private readonly createUserService: CreateUserService
  ) {}

  @Post('login')
  @ApiOperation({ 
    summary: 'User login', 
    description: 'Allows an existing user to log in by providing valid credentials (email and password).' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Successful login, returns a JWT token for authenticated access.' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid credentials, login failed.'
  })
  @ApiBody({ 
    description: 'User login credentials', 
    type: UserLoginDto 
  })
  async login(@Body() loginDto: UserLoginDto) {
    return this.authService.login(loginDto);
  }

  @Post()
  @ApiOperation({ 
    summary: 'Create a new user', 
    description: 'Registers a new user by accepting user details such as email, password, and name. Returns the details of the newly created user.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'User created successfully. The response contains the details of the new user.',
    type: CreateUserResponseDto 
  })
  @ApiResponse({ status: 400, description: 'Bad request, validation failed.' })
  @ApiBody({ 
    description: 'Details of the new user to be created', 
    type: CreateUserDto 
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.createUserService.createUser(createUserDto);
  }
}

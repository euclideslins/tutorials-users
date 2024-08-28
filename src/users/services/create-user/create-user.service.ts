import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { Usuario } from '../../../database/entities/usuario.entity';
import { CreateUserResponseDto } from 'users/dto/created-user-response.dto';

@Injectable()
export class CreateUserService {
    constructor(
        @InjectRepository(Usuario)
        private readonly userRepository: Repository<Usuario>,
      ) {}
    
      async createUser(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
        const { nome, email, senha } = createUserDto;
    
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
          throw new BadRequestException('Email já está em uso');
        }
    
        const hashedPassword = await bcrypt.hash(senha, 10);

        const newUser = this.userRepository.create({
            nome,
            email,
            senha: hashedPassword,
          });
      
          await this.userRepository.save(newUser);
          
          return {
            email: newUser.email,
            nome: newUser.nome,
          };
      }
}

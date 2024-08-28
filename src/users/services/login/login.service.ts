import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../../../database/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(Usuario)
        private readonly userRepository: Repository<Usuario>,
      ) {}
    
      async validateUser(email: string, senha: string): Promise<any> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user && await bcrypt.compare(senha, user.senha)) {
          const { senha, ...result } = user;
          return result;
        }
        return null;
      }
    
      async login(user: any) {    
       const validUser = await this.validateUser(user.email, user.senha)
       
        if(validUser == null ||  !validUser) {
          throw new BadRequestException("Credenciais invalidas")
        }
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}

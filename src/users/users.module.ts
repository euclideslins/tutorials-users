import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './authorization/jwt.strategy';
import { LoginService } from './services/login/login.service';
import { CreateUserService } from './services/create-user/create-user.service';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [UsersController],
  providers: [JwtStrategy, LoginService, CreateUserService]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TutorialModule } from './tutorial/tutorial.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from '@nestjs/cache-manager';
import { Tutorial } from './database/entities/tutorial.entity';
import { Usuario } from './database/entities/usuario.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TutorialModule, 
    CacheModule.register({
      ttl: 300, 
      max: 100,
    }),
    ConfigModule.forRoot({ // Carrega o arquivo .env
      isGlobal: true, // Torna as variáveis de ambiente disponíveis globalmente
    }),
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

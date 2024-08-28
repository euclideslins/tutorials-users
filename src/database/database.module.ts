import { DynamicModule, Global, Module } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './typeorm.config';
import { customUsuariolRepositoryMethods } from './repositories/user.repository';
import { DataSource } from 'typeorm';
import { Tutorial } from './entities/tutorial.entity';
import { Usuario } from './entities/usuario.entity';
import { customTutorialRepositoryMethods } from './repositories/tutorial.repository';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({})
export class DatabaseModule {
    static forRoot(entities = [], options?): DynamicModule {
        const sqlRepositories = [
            {
                provide: getRepositoryToken(Tutorial),
                inject: [getDataSourceToken()],
                useFactory: (dataSource: DataSource) => {
                    return dataSource.getRepository(Tutorial).extend(customTutorialRepositoryMethods);
                },
            },
            {
                provide: getRepositoryToken(Usuario),
                inject: [getDataSourceToken()],
                useFactory: (dataSource: DataSource) => {
                    return dataSource.getRepository(Usuario).extend(customUsuariolRepositoryMethods);
                },
            },
        ];

        return {
            module: DatabaseModule,
            imports: [TypeOrmModule.forRootAsync(typeormConfig), ConfigModule.forRoot()],
            providers: [...sqlRepositories],
            exports: [...sqlRepositories],
        };
    }
}

import { Module } from '@nestjs/common';
import { TutorialController } from './tutorial.controller';
import { PaginatedListService } from './services/paginated-list/paginated-list.service';
import { CreateTutorialService } from './services/create-tutorial/create-tutorial.service';
import { DeleteTutorialService } from './services/delete-tutorial/delete-tutorial.service';
import { UpdateTutorialService } from './services/update-tutorial/update-tutorial.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { DatabaseModule } from 'database/database.module';


@Module({
  imports: [
    DatabaseModule.forRoot(),
    CacheModule.register(),
  ],
  controllers: [TutorialController],
  providers: [PaginatedListService, CreateTutorialService, DeleteTutorialService, UpdateTutorialService]
})
export class TutorialModule {}

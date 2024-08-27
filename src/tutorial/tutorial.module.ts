import { Module } from '@nestjs/common';
import { TutorialController } from './tutorial.controller';
import { PaginatedListService } from './paginated-list/paginated-list.service';
import { CreateTutorialService } from './create-tutorial/create-tutorial.service';
import { DeleteTutorialService } from './delete-tutorial/delete-tutorial.service';
import { UpdateTutorialService } from './update-tutorial/update-tutorial.service';

@Module({
  controllers: [TutorialController],
  providers: [PaginatedListService, CreateTutorialService, DeleteTutorialService, UpdateTutorialService]
})
export class TutorialModule {}

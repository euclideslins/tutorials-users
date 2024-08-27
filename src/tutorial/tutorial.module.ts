import { Module } from '@nestjs/common';
import { TutorialController } from './tutorial.controller';

@Module({
  controllers: [TutorialController]
})
export class TutorialModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tutorial } from '../../../database/entities/tutorial.entity'; 
import { Repository } from 'typeorm';


@Injectable()
export class DeleteTutorialService {
    constructor(
        @InjectRepository(Tutorial)
        private readonly tutorialRepository: Repository<Tutorial>,
      ) {}
    
      async deleteTutorial(id: number): Promise<void> {
        const result = await this.tutorialRepository.delete(id);
    
        if (result.affected === 0) {
          throw new NotFoundException(`Tutorial with ID ${id} not found`);
        }
      }
}

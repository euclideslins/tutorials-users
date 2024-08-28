import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tutorial } from '../../../database/entities/tutorial.entity';
import { TutorialRequest } from 'tutorial/dto/update-tutorial-request.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateTutorialService {
    constructor(
        @InjectRepository(Tutorial)
        private readonly tutorialRepository: Repository<Tutorial>,
      ) {}
    
      async updateTutorial(id: number, updateTutorialDto: TutorialRequest): Promise<Tutorial> {
        const tutorial = await this.tutorialRepository.findOne({
            where: { id },
          });

        if (!tutorial) {
          throw new NotFoundException(`Tutorial with ID ${id} not found`);
        }
        if (updateTutorialDto.titulo) {
          tutorial.titulo = updateTutorialDto.titulo;
        }
        if (updateTutorialDto.conteudo) {
          tutorial.conteudo = updateTutorialDto.conteudo;
        }
        
        tutorial.updatedAt = new Date();
    
        return await this.tutorialRepository.save(tutorial);
    }
}
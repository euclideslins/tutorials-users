import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tutorial } from '../../../database/entities/tutorial.entity';
import { TutorialRequest } from 'tutorial/dto/update-tutorial-request.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CreateTutorialService {
    constructor(
        @InjectRepository(Tutorial)
        private readonly tutorialRepository: Repository<Tutorial>,
      ) {}
    
      async createTutorial(createTutorialDto: TutorialRequest): Promise<Tutorial> {
        const { titulo,  conteudo} = createTutorialDto;
        const existingTutorial = await this.tutorialRepository.findOne({
          where: { titulo },
      });

      if (existingTutorial) {
        throw new BadRequestException('Já existe um tutorial com esse título.');
      }

        const newTutorial = this.tutorialRepository.create({
          titulo,
          conteudo,
          createdAt: new Date(),
        });
    
        return await this.tutorialRepository.save(newTutorial);
    }

}
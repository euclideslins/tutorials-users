import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTutorialService } from './create-tutorial.service';
import { Tutorial } from '../../../database/entities/tutorial.entity';
import { BadRequestException } from '@nestjs/common';
import { TutorialRequest } from 'tutorial/dto/update-tutorial-request.dto';

describe('CreateTutorialService', () => {
  let service: CreateTutorialService;
  let repository: Repository<Tutorial>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTutorialService,
        {
          provide: getRepositoryToken(Tutorial),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateTutorialService>(CreateTutorialService);
    repository = module.get<Repository<Tutorial>>(getRepositoryToken(Tutorial));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTutorial', () => {
    it('should create a new tutorial successfully', async () => {
      const createTutorialDto: TutorialRequest = {
        titulo: 'New Tutorial',
        conteudo: 'Tutorial content',
      };

      const existingTutorial = null;
      const newTutorial: Partial<Tutorial> = {
        titulo: createTutorialDto.titulo,
        conteudo: createTutorialDto.conteudo,
        createdAt: new Date(),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingTutorial);
      jest.spyOn(repository, 'create').mockImplementation((tutorial: Partial<Tutorial>) => ({
        ...tutorial,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }) as Tutorial);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...newTutorial,
        id: 1,
        updatedAt: new Date(),
      } as Tutorial);

      const result = await service.createTutorial(createTutorialDto);

      expect(result).toEqual({
        titulo: createTutorialDto.titulo,
        conteudo: createTutorialDto.conteudo,
        id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(repository.findOne).toHaveBeenCalledWith({ where: { titulo: createTutorialDto.titulo } });
      expect(repository.create).toHaveBeenCalledWith({
        titulo: createTutorialDto.titulo,
        conteudo: createTutorialDto.conteudo,
        createdAt: expect.any(Date),
      });
      expect(repository.save).toHaveBeenCalledWith({
        titulo: createTutorialDto.titulo,
        conteudo: createTutorialDto.conteudo,
        createdAt: expect.any(Date),
        id: 1,
        updatedAt: expect.any(Date),
      });
    });

    it('should throw BadRequestException if tutorial with the same title exists', async () => {
      const createTutorialDto: TutorialRequest = {
        titulo: 'Existing Tutorial',
        conteudo: 'Tutorial content',
      };

      const existingTutorial: Tutorial = {
        id: 1,
        titulo: createTutorialDto.titulo,
        conteudo: createTutorialDto.conteudo,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Tutorial;
      
      jest.spyOn(repository, 'findOne').mockResolvedValue(existingTutorial);

      await expect(service.createTutorial(createTutorialDto)).rejects.toThrow(BadRequestException);
      await expect(service.createTutorial(createTutorialDto)).rejects.toThrow('Já existe um tutorial com esse título.');
    });
  });
});

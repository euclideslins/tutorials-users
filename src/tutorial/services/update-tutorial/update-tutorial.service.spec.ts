import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateTutorialService } from './update-tutorial.service';
import { Tutorial } from '../../../database/entities/tutorial.entity';import { NotFoundException } from '@nestjs/common';
import { TutorialRequest } from 'tutorial/dto/update-tutorial-request.dto';

describe('UpdateTutorialService', () => {
  let service: UpdateTutorialService;
  let repository: Repository<Tutorial>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTutorialService,
        {
          provide: getRepositoryToken(Tutorial),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateTutorialService>(UpdateTutorialService);
    repository = module.get<Repository<Tutorial>>(getRepositoryToken(Tutorial));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateTutorial', () => {
    it('should update a tutorial successfully', async () => {
      const updateTutorialDto: TutorialRequest = {
        titulo: 'Updated Title',
        conteudo: 'Updated content',
      };

      const existingTutorial: Tutorial = {
        id: 1,
        titulo: 'Old Title',
        conteudo: 'Old content',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Tutorial;

      const updatedTutorial: Tutorial = {
        ...existingTutorial,
        ...updateTutorialDto,
        updatedAt: new Date(),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingTutorial);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedTutorial);

      const result = await service.updateTutorial(1, updateTutorialDto);

      expect(result).toEqual(updatedTutorial);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalledWith({
        ...existingTutorial,
        ...updateTutorialDto,
        updatedAt: expect.any(Date),
      });
    });

    it('should throw NotFoundException if tutorial is not found', async () => {
      const updateTutorialDto: TutorialRequest = {
        titulo: 'Updated Title',
        conteudo: 'Updated content',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.updateTutorial(1, updateTutorialDto)).rejects.toThrow(NotFoundException);
      await expect(service.updateTutorial(1, updateTutorialDto)).rejects.toThrow('Tutorial with ID 1 not found');
    });
  });
});

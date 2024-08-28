import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DeleteTutorialService } from './delete-tutorial.service';
import { Tutorial } from '../../../database/entities/tutorial.entity';
describe('DeleteTutorialService', () => {
  let service: DeleteTutorialService;
  let repository: Repository<Tutorial>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTutorialService,
        {
          provide: getRepositoryToken(Tutorial),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DeleteTutorialService>(DeleteTutorialService);
    repository = module.get<Repository<Tutorial>>(getRepositoryToken(Tutorial));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete a tutorial successfully', async () => {
    const deleteResult = { affected: 1 };
    jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult as any);
  
    await expect(service.deleteTutorial(1)).resolves.toBeUndefined(); 
  
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
  

  it('should throw NotFoundException if no tutorial is found', async () => {
    const deleteResult = { affected: 0 };
    jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult as any);

    await expect(service.deleteTutorial(1)).rejects.toThrow(NotFoundException);
  });
});

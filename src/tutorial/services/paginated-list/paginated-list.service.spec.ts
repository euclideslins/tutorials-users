import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PaginatedListService } from './paginated-list.service';
import { Tutorial } from '../../../database/entities/tutorial.entity';
import { TutorialRepository } from 'database/repositories/tutorial.repository';
import { PaginatedResponse } from 'utils/paginated-response-interface';

describe('PaginatedListService', () => {
  let service: PaginatedListService;
  let tutorialRepository: TutorialRepository;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaginatedListService,
        {
          provide: getRepositoryToken(Tutorial),
          useValue: {
            paginatedTutorials: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PaginatedListService>(PaginatedListService);
    tutorialRepository = module.get<TutorialRepository>(getRepositoryToken(Tutorial));
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return data from cache if available', async () => {
      const page = 1;
      const limit = 2;
      const cachedResponse: PaginatedResponse<Tutorial> = {
        data: [],
        total: 0,
        page,
        limit,
      };

      jest.spyOn(cacheManager, 'get').mockResolvedValue(cachedResponse);

      const result = await service.findAll(page, limit);

      expect(result).toEqual(cachedResponse);
      expect(cacheManager.get).toHaveBeenCalledWith(`tutorials-page-${page}-limit-${limit}`);
      expect(tutorialRepository.paginatedTutorials).not.toHaveBeenCalled();
    });

    it('should return data from repository and cache it if not in cache', async () => {
      const page = 1;
      const limit = 2;
      const data: Tutorial[] = [{ id: 1, titulo: 'Test', conteudo: 'Content', createdAt: new Date(), updatedAt: new Date() }];
      const total = 1;
      const paginatedResponse: PaginatedResponse<Tutorial> = { data, total, page, limit };

      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
      jest.spyOn(tutorialRepository, 'paginatedTutorials').mockResolvedValue([data, total]);
      jest.spyOn(cacheManager, 'set').mockResolvedValue(undefined);

      const result = await service.findAll(page, limit);

      expect(result).toEqual(paginatedResponse);
      expect(cacheManager.get).toHaveBeenCalledWith(`tutorials-page-${page}-limit-${limit}`);
      expect(tutorialRepository.paginatedTutorials).toHaveBeenCalledWith(page, limit, undefined, undefined, undefined);
      expect(cacheManager.set).toHaveBeenCalledWith(`tutorials-page-${page}-limit-${limit}`, paginatedResponse, 15000);
    });
  });
});

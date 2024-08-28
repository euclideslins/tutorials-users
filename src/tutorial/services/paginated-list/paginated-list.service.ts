import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { TutorialRepository } from 'database/repositories/tutorial.repository';
import { PaginatedResponse } from 'utils/paginated-response-interface';
import { Tutorial } from '../../../database/entities/tutorial.entity';

@Injectable()
export class PaginatedListService {
    constructor(
      @InjectRepository(Tutorial) private readonly tutorialRepository: TutorialRepository,

        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
      ) {}
    
      async findAll(
        page: number = 1, 
        limit: number = 10,
        titulo?: string,
        dataInicio?: string,
        dataFim?: string,
      ): Promise<PaginatedResponse<Tutorial>> {
        const cacheKey = `tutorials-page-${page}-limit-${limit}`;
        const cachedData = await this.cacheManager.get<PaginatedResponse<Tutorial>>(cacheKey);
        
        if (cachedData) {
            return cachedData;
        } 
        const [data, total] = await this.tutorialRepository.paginatedTutorials(page, limit, titulo, dataInicio, dataFim);

        const response = {
          data,
          total,
          page,
          limit,
        };
    
        await this.cacheManager.set(cacheKey, response, 15000); 
    
        return response;
    }
}
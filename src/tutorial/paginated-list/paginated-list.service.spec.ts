import { Test, TestingModule } from '@nestjs/testing';
import { PaginatedListService } from './paginated-list.service';

describe('PaginatedListService', () => {
  let service: PaginatedListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginatedListService],
    }).compile();

    service = module.get<PaginatedListService>(PaginatedListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

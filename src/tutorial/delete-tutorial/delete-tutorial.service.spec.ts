import { Test, TestingModule } from '@nestjs/testing';
import { DeleteTutorialService } from './delete-tutorial.service';

describe('DeleteTutorialService', () => {
  let service: DeleteTutorialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteTutorialService],
    }).compile();

    service = module.get<DeleteTutorialService>(DeleteTutorialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

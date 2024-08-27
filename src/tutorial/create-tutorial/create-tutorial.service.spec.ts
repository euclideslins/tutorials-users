import { Test, TestingModule } from '@nestjs/testing';
import { CreateTutorialService } from './create-tutorial.service';

describe('CreateTutorialService', () => {
  let service: CreateTutorialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTutorialService],
    }).compile();

    service = module.get<CreateTutorialService>(CreateTutorialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

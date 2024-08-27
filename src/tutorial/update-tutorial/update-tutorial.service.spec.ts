import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTutorialService } from './update-tutorial.service';

describe('UpdateTutorialService', () => {
  let service: UpdateTutorialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateTutorialService],
    }).compile();

    service = module.get<UpdateTutorialService>(UpdateTutorialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

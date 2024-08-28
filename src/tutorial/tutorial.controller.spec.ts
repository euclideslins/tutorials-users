import { Test, TestingModule } from '@nestjs/testing';
import { TutorialController } from './tutorial.controller';
import { CreateTutorialService } from './services/create-tutorial/create-tutorial.service';
import { UpdateTutorialService } from './services/update-tutorial/update-tutorial.service';
import { DeleteTutorialService } from './services/delete-tutorial/delete-tutorial.service';
import { PaginatedListService } from './services/paginated-list/paginated-list.service';
import { TutorialRequest } from './dto/update-tutorial-request.dto';
import { Tutorial } from '../database/entities/tutorial.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TutorialController', () => {
  let controller: TutorialController;
  let createService: CreateTutorialService;
  let updateService: UpdateTutorialService;
  let deleteService: DeleteTutorialService;
  let paginatedListService: PaginatedListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutorialController],
      providers: [
        {
          provide: CreateTutorialService,
          useValue: { createTutorial: jest.fn() },
        },
        {
          provide: UpdateTutorialService,
          useValue: { updateTutorial: jest.fn() },
        },
        {
          provide: DeleteTutorialService,
          useValue: { deleteTutorial: jest.fn() },
        },
        {
          provide: PaginatedListService,
          useValue: { findAll: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<TutorialController>(TutorialController);
    createService = module.get<CreateTutorialService>(CreateTutorialService);
    updateService = module.get<UpdateTutorialService>(UpdateTutorialService);
    deleteService = module.get<DeleteTutorialService>(DeleteTutorialService);
    paginatedListService = module.get<PaginatedListService>(PaginatedListService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('createTutorial', () => {
    it('should create a new tutorial', async () => {
      const createTutorialDto: TutorialRequest = { titulo: 'New Tutorial', conteudo: 'Content' };
      const result: Tutorial = {
        id: 1,
        titulo: 'New Tutorial',
        conteudo: 'Content',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(createService, 'createTutorial').mockResolvedValue(result);

      expect(await controller.createTutorial(createTutorialDto)).toEqual(result);
    });

    it('should throw BadRequestException if creation fails', async () => {
      const createTutorialDto: TutorialRequest = { titulo: 'Existing Tutorial', conteudo: 'Content' };
      jest.spyOn(createService, 'createTutorial').mockRejectedValue(new BadRequestException('Tutorial already exists'));

      await expect(controller.createTutorial(createTutorialDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateTutorial', () => {
    it('should update an existing tutorial', async () => {
      const id = 1;
      const updateTutorialDto: TutorialRequest = { titulo: 'Updated Title' };
      const result: Tutorial = {
        id,
        titulo: 'Updated Title',
        conteudo: 'Old Content',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(updateService, 'updateTutorial').mockResolvedValue(result);

      expect(await controller.updateTutorial(id, updateTutorialDto)).toEqual(result);
    });

    it('should throw NotFoundException if tutorial is not found', async () => {
      const id = 1;
      const updateTutorialDto: TutorialRequest = { titulo: 'Updated Title' };
      jest.spyOn(updateService, 'updateTutorial').mockRejectedValue(new NotFoundException(`Tutorial with ID ${id} not found`));

      await expect(controller.updateTutorial(id, updateTutorialDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteTutorial', () => {
    it('should delete a tutorial successfully', async () => {
      const id = 1;
      jest.spyOn(deleteService, 'deleteTutorial').mockResolvedValue(undefined);

      await expect(controller.deleteTutorial(id)).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if tutorial is not found', async () => {
      const id = 1;
      jest.spyOn(deleteService, 'deleteTutorial').mockRejectedValue(new NotFoundException(`Tutorial with ID ${id} not found`));

      await expect(controller.deleteTutorial(id)).rejects.toThrow(NotFoundException);
    });
  });
});

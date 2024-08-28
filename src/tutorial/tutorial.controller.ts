import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'; 
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { PaginatedListService } from './services/paginated-list/paginated-list.service';
import { UpdateTutorialService } from './services/update-tutorial/update-tutorial.service';
import { CreateTutorialService } from './services/create-tutorial/create-tutorial.service';
import { DeleteTutorialService } from './services/delete-tutorial/delete-tutorial.service';
import { TutorialRequest } from './dto/update-tutorial-request.dto';
import { PaginatedListDto } from './dto/pagineted-list.dto';
import { JwtAuthGuard } from '../users/authorization/auth.guard';
import { PaginatedResponse } from 'utils/paginated-response-interface';
import { Tutorial } from '../database/entities/tutorial.entity';
import { PaginatedResponseDto } from './dto/paginated-list-response.dto';

@ApiTags('Tutorial')
@ApiBearerAuth()
@Controller('tutorial')
export class TutorialController {
    constructor(
        private paginatedListService: PaginatedListService,
        private updateTutorialService: UpdateTutorialService,
        private createTutorialService: CreateTutorialService,
        private deleteTutorialService: DeleteTutorialService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Get paginated list of tutorials' })
    @ApiQuery({ 
      name: 'page',
      required: false, 
      description: 'Page number'
     })
    @ApiQuery({ 
      name: 'limit',
      required: false,
      description: 'Number of tutorials per page' 
    })
    @ApiQuery({ 
      name: 'titulo',
      required: false, 
      description: 'Tutorial title' 
    })
    @ApiQuery({ 
      name: 'dataInicio', 
      required: false, 
      description: 'Start date for filtering tutorials'
    })
    @ApiQuery({ 
      name: 'dataFim',
      required: false, 
      description: 'End date for filtering tutorials' 
    })
    @ApiResponse({
      status: 200,
      description: 'Paginated list of tutorials',
      type: PaginatedResponseDto,
  })
    async findAllPaginated(@Query() payload: PaginatedListDto
    ): Promise<PaginatedResponse<Tutorial>>{
        return this.paginatedListService.findAll(
            payload.page,
            payload.limit,
            payload.titulo,
            payload.dataInicio,
            payload.dataFim
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new tutorial' })
    @ApiBody({ 
      type: TutorialRequest, 
      description: 'The data to create a new tutorial'
    })
    @ApiResponse({
        status: 201,
        description: 'Tutorial created successfully',
        type: Tutorial
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async createTutorial(
      @Body() createTutorialDto: TutorialRequest
    ): Promise<Tutorial> {
      return this.createTutorialService.createTutorial(createTutorialDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Update an existing tutorial' })
    @ApiParam({ 
      name: 'id', 
      description: 'ID of the tutorial to update' 
    })
    @ApiBody({ 
      type: TutorialRequest, 
      description: 'The data to update the tutorial' 
    })
    @ApiResponse({
        status: 200,
        description: 'Tutorial updated successfully',
        type: Tutorial
    })
    @ApiResponse({ status: 404, description: 'Tutorial not found' })
    async updateTutorial(
      @Param('id') id: number,
      @Body() updateTutorialDto: TutorialRequest
    ): Promise<Tutorial> {
      return this.updateTutorialService.updateTutorial(id, updateTutorialDto);
    }

    @Delete(':id')
    @ApiOperation({
       summary: 'Delete a tutorial by ID'
     })
    @ApiParam({
       name: 'id', 
       description: 'ID of the tutorial to delete'
    })
    @ApiResponse({ 
      status: 204,
      description: 'Tutorial deleted successfully' 
    })
    @ApiResponse({ 
      status: 404,
      description: 'Tutorial not found' 
    })
    async deleteTutorial(@Param('id') id: number): Promise<void> {
      return this.deleteTutorialService.deleteTutorial(id);
    }
}

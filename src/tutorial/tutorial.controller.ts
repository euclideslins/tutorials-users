import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('tutorial')
export class TutorialController {

    @Get()
    findAllPaginated():string {
        return 'oi'
    }

    
    @Post()
    createTutorial():string {
        return 'oi'
    }

    
    @Put()
    updateTutorial():string {
        return 'oi'
    }

    
    @Delete()
    deleteTutorial():string {
        return 'oi'
    }
}

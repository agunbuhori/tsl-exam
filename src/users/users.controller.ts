import { Body, Controller, Get, Post } from '@nestjs/common';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    index() {
        return this.usersService.findAll();
    }

    @Post()
    store(@Body() data: Users) {
        return this.usersService.create(data);
    }

}

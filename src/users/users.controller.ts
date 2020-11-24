import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    index(@Query() query) {
        return this.usersService.findAll(query);
    }

    @Post()
    store(@Body() data: Users) {
        return this.usersService.create(data);
    }
}

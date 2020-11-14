import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private JWTService: JwtService, private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        let auth = req.user;

        return this.usersService.checkBy({id: auth.id});
    }

    @Post('login')
    async login(@Body() request) {
        
        let login = await this.authService.authenticate(request.number, request.password);

        if (login) {
            const { id, number } = login;
            let access_token = this.JWTService.sign({id, number});

            return {
                message: "Login success",
                access_token
            }
        }

        return {
            message: "Login failed"
        }
    }
}

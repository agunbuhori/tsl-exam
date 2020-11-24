import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
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
    async login(@Body() body) {
        let login = await this.authService.authenticate(body.username, body.password);

        if (login) {
            const { id } = login;
            let access_token = this.JWTService.sign({ id });

            return {
                status: 200,
                message: "Login success",
                expiresIn: jwtConstants.expiresIn,
                access_token
            }
        }

        return {
            message: "Login failed"
        }
    }
}

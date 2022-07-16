import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

    @Post('/p')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
      return req.user;
    }

    @Post('/k')
    @UseGuards(JwtAuthGuard)
    g(@Request() req) {
      console.log(req);
      return req.body;
    }
}

import { Body, Controller, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req, @Res({passthrough: true}) res: Response) {
      // return this.authService.login(req.user);
      const user = req.user;
      const {
        accessToken,
        ...accessOption
      } = this.authService.getCookieWithJwtAccessToken(user.username);

      const {
        refreshToken,
        ...refreshOption
      } = this.authService.getCookieWithJwtRefreshToken(user.username);

      await this.authService.setCurrentRefreshToken(refreshToken, user.username);

      res.cookie('Authentication', accessToken, accessOption);
      res.cookie('Refresh', refreshToken, refreshOption);

      return user;
    }

    @UseGuards(JwtRefreshGuard)
    @Post('/refresh')
    refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
      const user = req.user;
      const {
        accessToken,
        ...accessOption
      } = this.authService.getCookieWithJwtAccessToken(user.username);
      res.cookie('Authentication', accessToken, accessOption);
      return user;
    }

    @Post('/create')
    create(@Body() createUserDto: CreateUserDto){
      console.log(createUserDto);
      return this.authService.create(createUserDto);
    }
}

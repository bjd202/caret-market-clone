import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { jwtConstants } from './jwt.constants';
import { CreateUserDto } from './user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ){}

    async findOne(username: string): Promise<User | null>{
        return await this.userRepository.findOneBy({
            username: username
        });
    }

    async validateUser(paramUser: User): Promise<any>{
        const user = await this.findOne(paramUser.username);
        console.log(user);
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(paramUser.password, salt);
        // console.log(hashedPassword);
        // if(user && user.password === paramUser.password){
        if(user && bcrypt.compare(paramUser.password, user.password)){
            const {password, ...result} = user;
            console.log(result);
            return result;
        }

        return null;
    }

    async login(user: User){
        const payload = { username: user.username };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    getCookieWithJwtAccessToken(username: string) {
      const payload = { username };
      const token = this.jwtService.sign(payload, {
          secret: jwtConstants.secret,
          expiresIn: jwtConstants.expiresIn,
      });

      return {
          accessToken: token,
          domain: 'localhost',
          path: '/',
          httpOnly: true,
          maxAge: jwtConstants.expiresIn * 1000
      };
    }

    getCookieWithJwtRefreshToken(username: string) {
      const payload = { username };
      const token = this.jwtService.sign(payload, {
          secret: jwtConstants.refreshSecret,
          expiresIn: jwtConstants.refreshExpresIn,
      });

      return {
          refreshToken: token,
          domain: 'localhost',
          path: '/',
          httpOnly: true,
          maxAge: jwtConstants.refreshExpresIn * 1000
      };
    }

    async setCurrentRefreshToken(refreshToken: string, username: string) {
      const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
      await this.userRepository.update({username}, { currentHashedRefreshToken });
    }

    async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
    //   const paramUser: User = {
    //       username: username, password: '', id: 0,
    //       post: []
    //   };
      
      const user = await this.findOne(username);
  
      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        user.currentHashedRefreshToken,
      );
  
      if (isRefreshTokenMatching) {
        return user;
      }
    }

    async create(createUserDto: CreateUserDto): Promise<void> {
        const {username, password} = createUserDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        
        createUserDto.password = hashedPassword;

        const user = this.userRepository.create({username, password});

        try {
            await this.userRepository.save(user);
        } catch (error) {
            console.log(error);
            if(error.code === 'ER_DUP_ENTRY'){
                throw new BadRequestException('중복된 username');
            }
        }
    }
}

import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { userInfo } from 'os';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Post as PostEntity } from 'src/post/post.entity';
import { Favorite } from './favorite.entity';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
@UseGuards(AuthGuard('jwt'))
export class FavoriteController {

    constructor(private favoriteService: FavoriteService){}

    @Post('/create')
    async create(
        @GetUser() user: User, 
        @Body() post: PostEntity
    ): Promise<Favorite>{
        console.log(user);
        console.log(post);
        return await this.favoriteService.create(user, post);
    }

    @Delete('/delete')
    async delete(
        @GetUser() user: User, 
        @Body() post: PostEntity
    ): Promise<void>{
        console.log(user);
        console.log(post);
        this.favoriteService.delete(user, post);
    }
}

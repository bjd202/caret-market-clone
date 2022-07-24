import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtRefreshGuard } from 'src/auth/jwt-refresh.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from 'src/auth/user.entity';
import { CreatePostDto } from './post.dto';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(AuthGuard('jwt'))
// @UseGuards(LocalAuthGuard)
export class PostController {

    constructor(private postService: PostService){}

    @Post('/create')
    create(
        @Body() createPostDto: CreatePostDto, 
        @GetUser() user: User
    ) {
        console.log(createPostDto);
        console.log(1231231231);
        console.log(user);
        return this.postService.create(createPostDto, user);
    }
}

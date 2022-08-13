import { Body, Controller, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtRefreshGuard } from 'src/auth/jwt-refresh.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from 'src/auth/user.entity';
import { CreatePostDto } from './post.dto';
import { Post as PostEntity } from './post.entity';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(AuthGuard('jwt'))
// @UseGuards(LocalAuthGuard)
export class PostController {

    constructor(private postService: PostService){}

    @Post('/create')
    // @UseInterceptors(FileInterceptor('files'))
    create(
        @Body() createPostDto: CreatePostDto, 
        @GetUser() user: User,
        // @UploadedFiles() files: Array<Express.Multer.File>
    ) {
        console.log(createPostDto);
        // console.log(files);
        return this.postService.create(createPostDto, user);
    }

    @Get('/list')
    list(): Promise<PostEntity[]>{
        return this.postService.list();
    }

    @Get('/:id')
    findOne(@Param('id') id): Promise<PostEntity>{
        return this.postService.findOne(id);
    }
}

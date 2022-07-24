import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post]),
        AuthModule,
    ],
    providers: [PostService],
    controllers: [PostController],
    exports: [PostService],
})
export class PostModule {}

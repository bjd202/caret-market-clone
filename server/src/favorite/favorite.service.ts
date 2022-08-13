import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Post } from 'src/post/post.entity';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(Favorite)
        private favoriteRepository: Repository<Favorite>
    ){}

    async create(user: User, post: Post): Promise<Favorite>{
        const favorite = this.favoriteRepository.create({
            user,
            post
        })

        try {
            return await this.favoriteRepository.save(favorite);
        } catch (error) {
            console.log(error);
        }
    }

    async delete(user: User, post: Post): Promise<void>{
        try {
            this.favoriteRepository.delete({
                user,
                post
            })
        } catch (error) {
            throw new Error('삭제를 실패했습니다.');
        }
    }
}

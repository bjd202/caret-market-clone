import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Repository } from "typeorm";
import { CreatePostDto } from "./post.dto";
import { Post } from "./post.entity";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ){}

    async create(createPostDto: CreatePostDto, user: User): Promise<void> {
        const {category,description,number,subject} = createPostDto;
        
        const post = this.postRepository.create({
            // category,
            // description,
            // number,
            // subject,
            // user
            ...createPostDto,
            user
        });

        try {
            await this.postRepository.save(post);
        } catch (error) {
            console.log(error);
        }
    }

    async list(): Promise<Post[]>{
       return await this.postRepository.find({
            order: {
                updated_at: 'DESC'
            }
        });
    }
}
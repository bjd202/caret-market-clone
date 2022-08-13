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

    async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
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
            return await this.postRepository.save(post);
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

    async findOne(id: number): Promise<Post>{
        this.updateViews(id);
        return await this.postRepository.findOne({where: {id}})
    }

    async updateViews(id: number): Promise<void>{
        await this.postRepository.update(id, {
            views: () => 'views + 1'
        });
    }
}
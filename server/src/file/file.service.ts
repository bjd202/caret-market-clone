import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';
import { Repository } from 'typeorm';
import { CreateFileDto } from './file.dto';
import { File } from './file.entity';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File)
        private fileRepository: Repository<File>,
    ){}

    async create(createFileDto: CreateFileDto, post: Post): Promise<void>{


        const file = this.fileRepository.create({
            ...createFileDto,
            post
        });

        try {
            await this.fileRepository.save(file);
        } catch (error) {
            console.log(error);
        }
    }
}

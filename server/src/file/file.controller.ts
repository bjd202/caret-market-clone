import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Post as PostEntity } from 'src/post/post.entity';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(private fileService: FileService){}

    @Post('/upload')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'files', maxCount: 10},
    ]))
    fileUpload(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() post: PostEntity
    ){
        console.log(post);
        console.log(post.id)

        for (let index = 0; index < files['files'].length; index++) {
            this.fileService.create(files['files'][index], post);
        }
    }
}

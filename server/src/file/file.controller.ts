import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {

    @Post('/upload')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'files', maxCount: 10},
    ]))
    fileUpload(
        @UploadedFiles() files: Array<Express.Multer.File>
    ){
        console.log(files);
    }
}

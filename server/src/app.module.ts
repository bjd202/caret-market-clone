import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';
import { FileModule } from './file/file.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'P@ssw0rd',
      database: 'caret-market-clone',
      // entities: [],
      synchronize: true,
      autoLoadEntities: true,
      logging: true
    }),
    AuthModule,
    PostModule,
    FileModule,
    FavoriteModule,
  ],
  controllers: [AppController, AuthController, PostController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}

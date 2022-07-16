import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

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
      autoLoadEntities: true
    }),
    AuthModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}

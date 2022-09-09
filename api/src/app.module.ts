import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserController } from './user/controller/user.controller';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { TodoController } from './todo/controller/todo.controller';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      url: process.env.DATABASE_URL
  }),
    UserModule,
    AuthModule,
    TodoModule],
  controllers: [AppController, UserController, TodoController],
  providers: [AppService],
  exports: []
})
export class AppModule {}

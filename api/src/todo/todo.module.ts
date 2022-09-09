import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { TodoController } from './controller/todo.controller';
import { TodoEntity } from './models/todo.entity';
import { TodoService } from './service/todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity]), UserModule],
  providers: [TodoService],
  controllers: [TodoController],
  exports: [TodoService]
})
export class TodoModule {}

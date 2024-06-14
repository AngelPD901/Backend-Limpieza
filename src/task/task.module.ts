import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { User } from 'src/auth/entities/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Task } from './entities/task.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Task])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}

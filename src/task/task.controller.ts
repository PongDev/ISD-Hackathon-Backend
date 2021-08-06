import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddTaskDTO } from './dto/add-task.dto';
import { EditTaskDTO } from './dto/edit-task.dto';
import { TaskService } from './task.service';

@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('add')
  async addTask(@Request() req, @Body() taskData: AddTaskDTO) {
    return await this.taskService.addTask(req.user.email, taskData);
  }

  @Put('edit')
  async editTask(@Request() req, @Body() taskData: EditTaskDTO) {
    return await this.taskService.editTask(req.user.email, taskData);
  }

  @Delete('delete/:id')
  async deleteTask(@Request() req, @Param() params) {
    return await this.taskService.deleteTask(req.user.email, params.id);
  }
}

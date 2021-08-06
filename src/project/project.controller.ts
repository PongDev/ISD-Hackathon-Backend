import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Task } from 'src/task/task.entity';
import { TaskService } from 'src/task/task.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { EditProjectDTO } from './dto/edit-project.dto';
import { ProjectService } from './project.service';

@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
  ) {}

  @Post('create')
  async createProject(@Request() req, @Body() projectData: CreateProjectDTO) {
    return await this.projectService.createProject(req.user.email, projectData);
  }

  @Put('edit')
  async editProject(@Request() req, @Body() projectData: EditProjectDTO) {
    return await this.projectService.editProject(req.user.email, projectData);
  }

  @Get(':id')
  async listProjectTask(@Request() req, @Param() params): Promise<Task[]> {
    return await this.taskService.taskList(req.user.email, params.id);
  }
}

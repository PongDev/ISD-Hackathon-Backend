import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Task } from 'src/task/task.entity';
import { TaskService } from 'src/task/task.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { EditProjectDTO } from './dto/edit-project.dto';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@ApiTags('project')
@ApiBearerAuth()
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

  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  async deleteProject(@Request() req, @Param() params): Promise<string> {
    return await this.projectService.deleteProject(req.user.email, params.id);
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  async getProject(@Request() req, @Param() params): Promise<Project> {
    return await this.projectService.getProject(req.user.email, params.id);
  }

  @Get(':id/tasks')
  @ApiParam({ name: 'id', required: true })
  async listProjectTask(@Request() req, @Param() params): Promise<Task[]> {
    return await this.taskService.taskList(req.user.email, params.id);
  }

  @Get(':id/assignTasks')
  @ApiParam({ name: 'id', required: true })
  async listProjectAssignTask(
    @Request() req,
    @Param() params,
  ): Promise<Task[]> {
    return await this.taskService.assignTaskList(req.user.email, params.id);
  }
}

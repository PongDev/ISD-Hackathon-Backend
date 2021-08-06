import {
  Body,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProjectDTO } from './dto/create-project.dto';
import { EditProjectDTO } from './dto/edit-project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createProject(@Request() req, @Body() projectData: CreateProjectDTO) {
    return this.projectService.createProject(req.user.username, projectData);
  }

  @UseGuards(JwtAuthGuard)
  @Put('edit')
  editProject(@Request() req, @Body() projectData: EditProjectDTO) {
    return this.projectService.editProject(req.user.username, projectData);
  }
}

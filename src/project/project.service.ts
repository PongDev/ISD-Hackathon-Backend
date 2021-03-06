import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskService } from 'src/task/task.service';
import { Repository } from 'typeorm';
import { CreateProjectDTO } from './dto/create-project.dto';
import { EditProjectDTO } from './dto/edit-project.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @Inject(forwardRef(() => TaskService))
    private taskService: TaskService,
  ) {}

  async getProject(email: string, projectID: number): Promise<Project> {
    const projectData = await this.projectRepository.findOne(projectID);

    if (!projectData || !projectData.member.includes(email)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return projectData;
  }

  async createProject(
    email: string,
    createProjectData: CreateProjectDTO,
  ): Promise<string> {
    if (!createProjectData.member.includes(email)) {
      createProjectData.member.push(email);
    }
    await this.projectRepository.insert(createProjectData);
    return 'Create Project Complete';
  }

  async editProject(
    email: string,
    editProjectData: EditProjectDTO,
  ): Promise<string> {
    const projectData = await this.projectRepository.findOne(
      editProjectData.id,
    );

    if (!projectData || !projectData.member.includes(email)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    await this.projectRepository.update(
      { id: editProjectData.id },
      editProjectData,
    );
    return 'Edit Project Complete';
  }

  async deleteProject(email: string, projectID: number): Promise<string> {
    const projectData = await this.projectRepository.findOne(projectID);

    if (!projectData || !projectData.member.includes(email)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    await this.taskService.removeProjectTask(projectData.id);
    await this.projectRepository.delete(projectData.id);
    return 'Delete Project Complete';
  }

  async getUserProject(email: string): Promise<Project[]> {
    return (
      await this.projectRepository.find({
        order: {
          dueDate: 'ASC',
          priority: 'DESC',
        },
      })
    ).filter((e) => {
      return e.member.includes(email);
    });
  }

  async isUserAllowAccessProject(
    email: string,
    projectID: number,
  ): Promise<boolean> {
    const projectData = await this.projectRepository.findOne(projectID);

    if (!projectData || !projectData.member.includes(email)) {
      return false;
    } else {
      return true;
    }
  }
}

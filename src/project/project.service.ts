import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDTO } from './dto/create-project.dto';
import { EditProjectDTO } from './dto/edit-project.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async createProject(
    username: string,
    createProjectData: CreateProjectDTO,
  ): Promise<string> {
    if (!createProjectData.member.includes(username)) {
      createProjectData.member.push(username);
    }
    await this.projectRepository.insert(createProjectData);
    return 'Create Project Complete';
  }

  async editProject(
    username: string,
    editProjectData: EditProjectDTO,
  ): Promise<string> {
    const projectData = await this.projectRepository.findOne(
      editProjectData.id,
    );

    if (!projectData || !projectData.member.includes(username)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    this.projectRepository.update({ id: editProjectData.id }, editProjectData);
    return 'Edit Project Complete';
  }

  async getUserProject(username: string): Promise<Project[]> {
    console.log(username);
    return (await this.projectRepository.find()).filter((e) => {
      return e.member.includes(username);
    });
  }

  async isUserAllowAccessProject(
    username: string,
    projectID: number,
  ): Promise<boolean> {
    const projectData = await this.projectRepository.findOne(projectID);

    if (!projectData || !projectData.member.includes(username)) {
      return false;
    } else {
      return true;
    }
  }
}

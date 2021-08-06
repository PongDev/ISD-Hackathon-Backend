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
    this.projectRepository.update({ id: editProjectData.id }, editProjectData);
    return 'Edit Project Complete';
  }

  async getUserProject(email: string): Promise<Project[]> {
    console.log(email);
    return (await this.projectRepository.find()).filter((e) => {
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

import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectService } from 'src/project/project.service';
import { Repository } from 'typeorm';
import { AddTaskDTO } from './dto/add-task.dto';
import { EditTaskDTO } from './dto/edit-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @Inject(forwardRef(() => ProjectService))
    private projectService: ProjectService,
  ) {}

  async addTask(email: string, addTaskData: AddTaskDTO): Promise<string> {
    if (
      !(await this.projectService.isUserAllowAccessProject(
        email,
        addTaskData.projectID,
      ))
    ) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    await this.taskRepository.insert(addTaskData);
    return 'Add Task Complete';
  }

  async editTask(email: string, editTaskData: EditTaskDTO): Promise<string> {
    const taskData = await this.taskRepository.findOne(editTaskData.projectID);

    if (
      !taskData ||
      !(await this.projectService.isUserAllowAccessProject(
        email,
        taskData.projectID,
      ))
    ) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    await this.taskRepository.update({ id: editTaskData.id }, editTaskData);
    return 'Edit Task Complete';
  }

  async deleteTask(email: string, taskID: number): Promise<string> {
    const taskData = await this.taskRepository.findOne(taskID);

    if (
      !taskData ||
      !(await this.projectService.isUserAllowAccessProject(
        email,
        taskData.projectID,
      ))
    ) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    await this.taskRepository.delete(taskID);
    return 'Delete Task Complete';
  }

  async taskList(email: string, projectID: number): Promise<Task[]> {
    if (
      !(await this.projectService.isUserAllowAccessProject(email, projectID))
    ) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return await this.taskRepository.find({
      where: {
        projectID: projectID,
      },
      order: {
        dueDate: 'ASC',
        priority: 'DESC',
      },
    });
  }

  async removeProjectTask(projectID: number): Promise<void> {
    await this.taskRepository.delete({ projectID: projectID });
  }
}

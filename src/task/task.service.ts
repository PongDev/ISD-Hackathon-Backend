import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    private projectService: ProjectService,
  ) {}

  async addTask(email: string, addTaskData: AddTaskDTO): Promise<string> {
    const taskData = await this.taskRepository.findOne(addTaskData.projectID);

    if (
      !this.projectService.isUserAllowAccessProject(email, taskData.projectID)
    ) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    await this.taskRepository.insert(addTaskData);
    return 'Add Task Complete';
  }

  async editTask(email: string, editTaskData: EditTaskDTO): Promise<string> {
    const taskData = await this.taskRepository.findOne(editTaskData.projectID);

    if (
      !this.projectService.isUserAllowAccessProject(email, taskData.projectID)
    ) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    await this.taskRepository.update({ id: editTaskData.id }, editTaskData);
    return 'Edit Task Complete';
  }

  async deleteTask(email: string, taskID: number): Promise<string> {
    const taskData = await this.taskRepository.findOne(taskID);

    if (
      !this.projectService.isUserAllowAccessProject(email, taskData.projectID)
    ) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    await this.taskRepository.delete(taskID);
    return 'Delete Task Complete';
  }

  async taskList(email: string, projectID: number): Promise<Task[]> {
    if (!this.projectService.isUserAllowAccessProject(email, projectID)) {
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
}

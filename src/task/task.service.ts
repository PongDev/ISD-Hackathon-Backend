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

  async addTask(username: string, addTaskData: AddTaskDTO): Promise<string> {
    const taskData = await this.taskRepository.findOne(addTaskData.projectID);

    if (
      !this.projectService.isUserAllowAccessProject(
        username,
        taskData.projectID,
      )
    ) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    await this.taskRepository.insert(addTaskData);
    return 'Add Task Complete';
  }

  async editTask(username: string, editTaskData: EditTaskDTO): Promise<string> {
    const taskData = await this.taskRepository.findOne(editTaskData.projectID);

    if (
      !this.projectService.isUserAllowAccessProject(
        username,
        taskData.projectID,
      )
    ) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    await this.taskRepository.update({ id: editTaskData.id }, editTaskData);
    return 'Edit Task Complete';
  }

  async deleteTask(username: string, taskID: number): Promise<string> {
    const taskData = await this.taskRepository.findOne(taskID);

    if (
      !this.projectService.isUserAllowAccessProject(
        username,
        taskData.projectID,
      )
    ) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    await this.taskRepository.delete(taskID);
    return 'Delete Task Complete';
  }

  async taskList(username: string, projectID: number): Promise<Task[]> {
    if (!this.projectService.isUserAllowAccessProject(username, projectID)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return await this.taskRepository.find({
      projectID: projectID,
    });
  }
}

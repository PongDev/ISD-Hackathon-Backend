import { IsInt } from 'class-validator';
import { AddTaskDTO } from './add-task.dto';

export class EditTaskDTO extends AddTaskDTO {
  @IsInt()
  id: number;
}

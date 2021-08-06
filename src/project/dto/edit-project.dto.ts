import { IsInt } from 'class-validator';
import { CreateProjectDTO } from './create-project.dto';

export class EditProjectDTO extends CreateProjectDTO {
  @IsInt()
  id: number;
}

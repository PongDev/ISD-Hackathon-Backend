import {
  IsDateString,
  IsInt,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class AddTaskDTO {
  @IsNumber()
  projectID: number;

  @IsString()
  @Length(1, 128)
  name: string;

  @IsString()
  @Length(0, 1000)
  detail: string;

  @IsString()
  @Length(1, 128)
  type: string;

  @IsString({ each: true })
  @Length(1, 64, { each: true })
  tagList: string[];

  @IsInt()
  @Min(0)
  @Max(5)
  priority: number;

  @IsString({ each: true })
  @Length(1, 64, { each: true })
  underTaker: string[];

  @IsDateString()
  dueDate: Date;
}

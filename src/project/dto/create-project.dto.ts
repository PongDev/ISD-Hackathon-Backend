import {
  IsDate,
  IsDateString,
  IsInt,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateProjectDTO {
  @IsString()
  @Length(1, 128)
  name: string;

  @IsString()
  @Length(0, 1000)
  description: string;

  @IsInt()
  @Min(0)
  @Max(5)
  priority: number;

  @IsString({ each: true })
  @Length(1, 64, { each: true })
  member: string[];

  @IsDateString()
  dueDate: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @Column()
  projectID: number;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', length: 1023 })
  detail: string;

  @Column()
  type: string;

  @Column({ type: 'json' })
  tagList: string[];

  @Column()
  priority: number;

  @Column({ type: 'json' })
  underTaker: string[];

  @Column({ type: 'datetime' })
  dueDate: Date;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}

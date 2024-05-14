import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from "typeorm";

import { userData } from "./userTable";

@Entity()
export class studentData extends BaseEntity {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column()
  grade: string;

  @ManyToOne(() => userData, (user) => user.student)
  @JoinColumn({ name: "user_id" })
  user: userData;
}

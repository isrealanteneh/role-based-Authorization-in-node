import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  ManyToMany,
} from "typeorm";
import { studentData } from "./studentTable";

@Entity()
export class userData extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ nullable: true })
  user_name: string;

  @Column({ nullable: true })
  passwords: string;

  @Column({ nullable: true })
  roles: string;

  @OneToOne(() => studentData)
  student: studentData;
}

import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { UserEntity } from "./user";

@Entity({ name: "errands" })
export class ErrandEntity extends BaseEntity {
  @PrimaryColumn()
  id?: string;

  @Column()
  message: string;

  @Column({ name: "userId" })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.errands)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user?: UserEntity;

  constructor(message: string, userId: string) {
    super();
    this.message = message;
    this.userId = userId;
  }
}

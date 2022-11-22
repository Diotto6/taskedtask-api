import bcrypt from "bcryptjs";
import {
  Entity,
  BaseEntity,
  Column,
  OneToMany,
  PrimaryColumn,
  BeforeInsert,
} from "typeorm";
import { ErrandEntity } from "./errands";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  id?: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  passwordConfirm: string;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 12);
    this.passwordConfirm = bcrypt.hashSync(this.passwordConfirm, 12);
  }

  @OneToMany(() => ErrandEntity, (errands) => errands.user)
  errands?: ErrandEntity[];

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email!;
    this.password = password!;
    this.passwordConfirm = passwordConfirm;
  }
}

import * as bcryptjs from 'bcryptjs';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { UserResponseDto } from './dto/user-response.dto';

export enum UserRole {
  DOCTOR = 'doctor',
  PATIENT = 'patient',
}

export enum UserResultOrder {
  NAME = 'name',
  CREATED_AT = 'createdAt',
}

export enum UserOrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'account', nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({
    name: 'role',
    nullable: false,
    type: 'enum',
    enum: Object.values(UserRole),
    default: 'patient',
  })
  role: UserRole;

  @Column({ name: 'created_at', nullable: false })
  createdAt: number;

  @Column({ name: 'updated_at', nullable: false })
  updatedAt: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcryptjs.compare(attempt, this.password);
  }

  toResponseObject(): UserResponseDto {
    const { id, name, email, role, createdAt, updatedAt } = this;

    return {
      id,
      name,
      email,
      role,
      createdAt,
      updatedAt,
    };
  }
}

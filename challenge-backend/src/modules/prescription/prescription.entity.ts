import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { MedicationEntity } from '../medication/entities/medication.entity';
import { UserEntity } from '../user/user.entity';

export enum PrescriptionOrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

@Entity({ name: 'prescriptions' })
export class PrescriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => MedicationEntity)
  @JoinTable()
  medications: ReadonlyArray<MedicationEntity>;

  @ManyToOne(
    () => UserEntity,
    user => user.id,
  )
  // @JoinColumn()
  pacient: UserEntity;

  @ManyToOne(
    () => UserEntity,
    user => user.id,
  )
  // @JoinColumn()
  doctor: UserEntity;

  @Column({ name: 'created_at', nullable: false })
  createdAt: number;

  @Column({ name: 'updated_at', nullable: false })
  updatedAt: number;
}

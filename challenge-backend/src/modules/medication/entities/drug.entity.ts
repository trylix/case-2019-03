import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { MedicationEntity } from './medication.entity';

@Entity({ name: 'drugs' })
export class DrugEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MedicationEntity)
  @JoinColumn({ name: 'medications' })
  medication: MedicationEntity;

  @Column({ name: 'name', nullable: false })
  name: string;
}

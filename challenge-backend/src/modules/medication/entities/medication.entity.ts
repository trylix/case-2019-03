import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { DrugEntity } from './drug.entity';

@Entity({ name: 'medications' })
export class MedicationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'medication_id', nullable: false })
  medicationId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'administer', nullable: false })
  administer: string;

  @Column({ name: 'concentration', nullable: false })
  concentration: string;

  @OneToMany(
    () => DrugEntity,
    drug => drug.medication,
  )
  drugs: DrugEntity[];
}

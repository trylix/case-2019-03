import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'medication_interactions' })
export class MedicationInteractionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'drug_one', nullable: false })
  drugOne: string;

  @Column({ name: 'drug_two', nullable: false })
  drugTwo: string;

  @Column({ name: 'risk', nullable: false })
  risk: string;

  @Column({ name: 'description', nullable: false })
  description: string;
}

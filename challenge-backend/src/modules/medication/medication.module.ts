import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DrugEntity } from './entities/drug.entity';
import { MedicationInteractionEntity } from './entities/medication-interaction.entity';
import { MedicationEntity } from './entities/medication.entity';
import { MedicationService } from './medication.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MedicationEntity,
      MedicationInteractionEntity,
      DrugEntity,
    ]),
  ],
  controllers: [],
  providers: [MedicationService],
  exports: [MedicationService],
})
export class MedicationModule {}

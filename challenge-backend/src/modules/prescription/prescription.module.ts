import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationModule } from 'src/modules/medication/medication.module';
import { UserModule } from 'src/modules/user/user.module';

import { PrescriptionController } from './prescription.controller';
import { PrescriptionEntity } from './prescription.entity';
import { PrescriptionService } from './prescription.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrescriptionEntity]),
    MedicationModule,
    UserModule,
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
})
export class PrescriptionModule {}

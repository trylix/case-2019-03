import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { MedicationInteractionEntity } from './entities/medication-interaction.entity';
import { MedicationEntity } from './entities/medication.entity';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(MedicationEntity)
    private readonly medicationRepo: Repository<MedicationEntity>,

    @InjectRepository(MedicationInteractionEntity)
    private readonly interactionRepo: Repository<MedicationInteractionEntity>,
  ) {}

  private readonly logger = new Logger('medication.service');

  private async fetchInteractionsFromDrugs(drugOne: string, drugTwo: string) {
    const possibleInteraction = await this.interactionRepo.findOne({
      where: {
        drugOne: drugOne,
        drugTwo: drugTwo,
      },
    });

    return possibleInteraction;
  }

  async getPossibleInteractionsFromMedications(
    medications: ReadonlyArray<MedicationEntity>,
  ): Promise<ReadonlyArray<MedicationInteractionEntity>> {
    try {
      const medicationsToIterate = {};
      for (const medication of medications) {
        if (!medicationsToIterate[medication.id]) {
          medicationsToIterate[medication.id] = [];
        }

        medicationsToIterate[medication.id].push(
          ...medications
            .filter(element => element.id !== medication.id)
            .map(element => element.id),
        );
      }

      const drugsToIterate = {};
      for (const [medicationId, medicationsIds] of Object.entries(
        medicationsToIterate,
      )) {
        const currentMedication = medications.find(
          element => element.id === medicationId,
        );

        for (const drug of currentMedication.drugs) {
          if (!drugsToIterate[drug.name]) {
            drugsToIterate[drug.name] = [];
          }

          (medicationsIds as string[]).map(id => {
            const medication = medications.find(element => element.id === id);

            drugsToIterate[drug.name].push(
              ...medication.drugs
                .filter(element => element.name !== drug.name)
                .map(element => element.name),
            );
          });
        }
      }

      const possibleInteractions = [];
      for (const [drugOne, drugs] of Object.entries(drugsToIterate)) {
        await Promise.all(
          (drugs as string[]).map(async drugTwo => {
            const interaction = await this.fetchInteractionsFromDrugs(
              drugOne,
              drugTwo,
            );

            if (interaction) {
              possibleInteractions.push(interaction);
            }
          }),
        );
      }

      return possibleInteractions;
    } catch (err) {
      this.logger.error(
        `error while trying to fetch medication interactions ${err}`,
      );
      throw err;
    }
  }

  async getMedicationsFromIds(
    medicationsIds: string[],
  ): Promise<ReadonlyArray<MedicationEntity>> {
    const medications = await this.medicationRepo.find({
      relations: ['drugs'],
      where: {
        id: In(medicationsIds),
      },
    });

    return medications;
  }
}

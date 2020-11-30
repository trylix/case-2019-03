import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { InteractionJsonDto } from 'src/modules/medication/dto/interaction-json.dto';
import { MedicationJsonDto } from 'src/modules/medication/dto/medication-json.dto';
import { DrugEntity } from 'src/modules/medication/entities/drug.entity';
import { MedicationInteractionEntity } from 'src/modules/medication/entities/medication-interaction.entity';
import { MedicationEntity } from 'src/modules/medication/entities/medication.entity';
import { Connection, getConnection } from 'typeorm';

export const readJson = (path: string) => require(path);

export const getDbConnection = async (): Promise<Connection> => {
  return getConnection();
};

export const dbSeeds = async (): Promise<void> => {
  const conn = await getDbConnection();

  const medications = readJson('../../dados/medicamentos.json');
  const interactions = readJson('../../dados/interacao_medicamentosa.json');

  const medicationsInDb = await conn.getRepository(MedicationEntity).count();

  const interactionsInDb = await conn
    .getRepository(MedicationInteractionEntity)
    .count();

  if (medicationsInDb <= 0) {
    Logger.log('Seeding medications and drugs table');

    await Promise.all(
      medications.map(async medicationJson => {
        const medication = plainToClass(MedicationJsonDto, medicationJson);

        const medicationEntity = await conn
          .getRepository(MedicationEntity)
          .save({
            medicationId: medication.IdMedicamento,
            name: medication.Nome,
            administer: medication.ViaAdministracao,
            concentration: medication.Concentracao,
            drugs: [],
          });

        await Promise.all(
          medication.Farmacos.map(async drug => {
            const drugEntity = await conn.getRepository(DrugEntity).save({
              medication: medicationEntity,
              name: drug,
            });

            medicationEntity.drugs.push(drugEntity);
          }),
        );

        await conn.getRepository(MedicationEntity).save(medicationEntity);
      }),
    );
  }

  if (interactionsInDb <= 0) {
    Logger.log('Seeding medications interactions table');

    await Promise.all(
      interactions.map(async interactionJson => {
        const interaction = plainToClass(InteractionJsonDto, interactionJson);

        const entity = conn.getRepository(MedicationInteractionEntity).create({
          drugOne: interaction.Farmaco1,
          drugTwo: interaction.Farmaco2,
          risk: interaction.Nome,
          description: interaction.Descricao,
        });

        await conn.getRepository(MedicationInteractionEntity).save(entity);
      }),
    );
  }
};

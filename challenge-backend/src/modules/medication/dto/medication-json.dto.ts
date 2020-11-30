import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MedicationJsonDto {
  @IsNumber()
  @IsNotEmpty()
  readonly IdMedicamento: number;

  @IsString()
  @IsNotEmpty()
  readonly Nome: string;

  @IsString()
  @IsNotEmpty()
  readonly ViaAdministracao: string;

  @IsString()
  @IsNotEmpty()
  readonly Concentracao: string;

  @IsArray()
  @IsNotEmpty()
  readonly Farmacos: string[];
}

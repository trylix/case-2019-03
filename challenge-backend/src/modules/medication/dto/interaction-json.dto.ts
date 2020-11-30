import { IsNotEmpty, IsString } from 'class-validator';

export class InteractionJsonDto {
  @IsString()
  @IsNotEmpty()
  readonly Farmaco1: string;

  @IsString()
  @IsNotEmpty()
  readonly Farmaco2: string;

  @IsString()
  @IsNotEmpty()
  readonly Nome: string;

  @IsString()
  @IsNotEmpty()
  readonly Descricao: string;
}

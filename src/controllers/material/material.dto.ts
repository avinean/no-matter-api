import { IsNumber, IsString } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  unit: string;

  @IsNumber()
  criticalQuantity: number;
}

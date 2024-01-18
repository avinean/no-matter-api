import { IsEnum, IsNumber, IsString } from 'class-validator';
import { MaterialTransactionType } from 'src/types/enums';

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

export class CreateTransactionDto {
  @IsNumber()
  materialId: number;

  @IsNumber()
  quantity: number;

  @IsEnum(MaterialTransactionType)
  type: MaterialTransactionType;
}

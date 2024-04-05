import { IsNumber, IsString } from 'class-validator';
import { MaterialEntity } from 'src/controllers/material/material.entity';

export class CreateMaterialTransactionDto {
  @IsString()
  material: MaterialEntity;

  @IsString()
  description: string;

  @IsNumber()
  quantity: number;
}

export class RevertMaterialTransactionDto {
  @IsString()
  description: string;
}

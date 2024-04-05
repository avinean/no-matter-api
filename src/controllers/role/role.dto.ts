import { ApiProperty } from '@nestjs/swagger';
import { PermissionEntity } from 'src/controllers/permission/permission.entity';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'The name of the role' })
  name: string;

  @ApiProperty({ example: {} })
  permissions: PermissionEntity[];
}

export class UpdateRoleDto extends CreateRoleDto {
  @ApiProperty({ example: '1' })
  id: number;
}

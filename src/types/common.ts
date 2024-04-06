import { RoleEntity } from 'src/controllers/role/role.entity';

export interface UserMeta {
  bisid: number;
  objid: number;
  sub: number;
  sud: RoleEntity[];
  email: string;
}

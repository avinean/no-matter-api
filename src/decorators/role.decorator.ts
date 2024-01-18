import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/types/enums';

export const Roles = (roles: Role[]) => SetMetadata('ROLE', roles);

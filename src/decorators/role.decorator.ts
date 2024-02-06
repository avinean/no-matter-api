import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/types/roles';

export const Roles = (roles: (Role | '*')[]) => SetMetadata('ROLE', roles);

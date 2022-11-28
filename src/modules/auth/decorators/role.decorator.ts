import { SetMetadata } from '@nestjs/common';
import { Roles } from '../../users/enums/roles.enum';

export const RolesAllowed = (...roles: Roles[]) => SetMetadata('roles', roles);

import { SetMetadata } from '@nestjs/common';

export const SkipPermission = () => SetMetadata('SKIP_PERMISSION', true);

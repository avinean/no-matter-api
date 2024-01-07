import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getIndex(): string {
    return 'Admin page';
  }
}

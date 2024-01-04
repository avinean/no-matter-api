import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller({
  host: 'admin.business.com',
})
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  index() {
    return this.adminService.getIndex();
  }
}

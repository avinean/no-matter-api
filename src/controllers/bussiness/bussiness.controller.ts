import { Controller, Get, Post } from '@nestjs/common';
import { BussinessService } from './bussiness.service';

@Controller('bussiness')
export class BussinessController {
  constructor(private readonly bussinessService: BussinessService) {}

  @Get('')
  async getAll() {
    return await this.bussinessService.getAll();
  }

  @Get('objects')
  async getAllObjects() {
    return await this.bussinessService.getAllObjects();
  }

  @Post('')
  async create() {
    // return await this.bussinessService.create();
  }

  @Post('objects')
  async createObject() {
    // return await this.bussinessService.createObject();
  }
}

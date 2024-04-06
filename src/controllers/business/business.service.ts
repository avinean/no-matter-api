import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessEntity } from 'src/controllers/business/business.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateBusinessDto } from './business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(BusinessEntity)
    private readonly businessRepository: Repository<BusinessEntity>,
  ) {}

  async findOne(dto: FindOneOptions<BusinessEntity>) {
    return await this.businessRepository.findOne(dto);
  }

  async create(dto: CreateBusinessDto) {
    const business = new BusinessEntity();
    business.name = dto.name;
    business.description = dto.description;
    business.image = dto.image;
    return await this.businessRepository.save(business);
  }

  update(id: number, dto: CreateBusinessDto) {
    return this.businessRepository.update({ id }, dto);
  }

  createTmp() {
    const business = new BusinessEntity();
    business.name = 'Temporary business name';
    return this.businessRepository.save(business);
  }
}

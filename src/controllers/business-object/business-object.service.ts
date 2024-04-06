import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessEntity } from 'src/controllers/business/business.entity';
import { BusinessObjectEntity } from 'src/controllers/business-object/business-object.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateBusinessObjectDto } from './business-object.dto';

@Injectable()
export class BusinessObjectService {
  constructor(
    @InjectRepository(BusinessObjectEntity)
    private readonly objectRepository: Repository<BusinessObjectEntity>,
  ) {}

  async create(dto: CreateBusinessObjectDto, businessId: number) {
    const business = new BusinessEntity();
    business.id = businessId;
    const businessObject = new BusinessObjectEntity();
    businessObject.name = dto.name;
    businessObject.description = dto.description;
    businessObject.image = dto.image;
    businessObject.business = business;
    return await this.objectRepository.save(businessObject);
  }

  update(id: number, dto: DeepPartial<BusinessObjectEntity>) {
    return this.objectRepository.update({ id }, dto);
  }

  async createTmp(business: BusinessEntity) {
    const businessObject = new BusinessObjectEntity();
    businessObject.name = 'Temporary business object name';
    businessObject.business = business;
    return await this.objectRepository.save(businessObject);
  }
}

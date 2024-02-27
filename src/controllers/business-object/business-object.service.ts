import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessEntity } from 'src/entities/business.entity';
import { BusinessObjectEntity } from 'src/entities/business-object.entity';
import { ProfileEntity } from 'src/entities/profile.entity';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { CreateBusinessObjectDto } from './business-object.dto';

@Injectable()
export class BusinessObjectService {
  constructor(
    @InjectRepository(BusinessObjectEntity)
    private readonly objectRepository: Repository<BusinessObjectEntity>,
  ) {}

  async findAll(profileId: number, businessId: number) {
    return await this.objectRepository.find({
      where: {
        createdBy: {
          id: profileId,
        },
        business: {
          id: businessId,
        },
      },
    });
  }

  async findOne(dto: FindOneOptions<BusinessObjectEntity>) {
    return await this.objectRepository.findOne(dto);
  }

  async create(
    dto: CreateBusinessObjectDto,
    profileId: number,
    businessId: number,
  ) {
    const profile = new ProfileEntity();
    profile.id = profileId;
    const business = new BusinessEntity();
    business.id = businessId;
    const businessObject = new BusinessObjectEntity();
    businessObject.name = dto.name;
    businessObject.description = dto.description;
    businessObject.image = dto.image;
    businessObject.createdBy = profile;
    businessObject.business = business;
    return await this.objectRepository.save(businessObject);
  }

  update(dto: DeepPartial<BusinessObjectEntity>, id: number) {
    return this.objectRepository.update({ id }, dto);
  }

  async createTmp(business: BusinessEntity, profile: ProfileEntity) {
    const businessObject = new BusinessObjectEntity();
    businessObject.name = 'Temporary business object name';
    businessObject.createdBy = profile;
    businessObject.business = business;
    return await this.objectRepository.save(businessObject);
  }
}

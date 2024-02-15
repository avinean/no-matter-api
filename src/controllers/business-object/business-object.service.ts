import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessEntity } from 'src/entities/business.entity';
import { BusinessObjectEntity } from 'src/entities/business-object.entity';
import { ProfileEntity } from 'src/entities/profile.entity';
import { FindOneOptions, Repository } from 'typeorm';
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
        profile: {
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
    businessObject.profile = profile;
    businessObject.business = business;
    return await this.objectRepository.save(businessObject);
  }

  async createTmp(business: BusinessEntity, profile: ProfileEntity) {
    const businessObject = new BusinessObjectEntity();
    businessObject.name = 'Temporary business object name';
    businessObject.profile = profile;
    businessObject.business = business;
    return await this.objectRepository.save(businessObject);
  }
}

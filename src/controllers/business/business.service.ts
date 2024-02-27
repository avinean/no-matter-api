import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessEntity } from 'src/entities/business.entity';
import { ProfileEntity } from 'src/entities/profile.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateBusinessDto } from './business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(BusinessEntity)
    private readonly businessRepository: Repository<BusinessEntity>,
  ) {}

  async findAll(profileId: number) {
    return await this.businessRepository.find({
      where: { owner: { id: profileId } },
      relations: {
        businessObjects: true,
      },
    });
  }

  async findOne(dto: FindOneOptions<BusinessEntity>) {
    return await this.businessRepository.findOne(dto);
  }

  async create(dto: CreateBusinessDto, profileId: number) {
    const profile = new ProfileEntity();
    profile.id = profileId;
    const business = new BusinessEntity();
    business.name = dto.name;
    business.description = dto.description;
    business.image = dto.image;
    business.owner = profile;
    return await this.businessRepository.save(business);
  }

  update(dto: CreateBusinessDto, id: number) {
    return this.businessRepository.update({ id }, dto);
  }

  async createTmp(profile: ProfileEntity) {
    const business = new BusinessEntity();
    business.name = 'Temporary business name';
    business.owner = profile;
    return await this.businessRepository.save(business);
  }
}

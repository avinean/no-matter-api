import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BussinessEntity, BussinessObjectEntity } from 'src/entities/Bussiness';
import { UserProfileEntity } from 'src/entities/User';
import { Repository } from 'typeorm';
import { CreateBussinessObjectDto } from './bussiness-object.dto';

@Injectable()
export class BussinessObjectService {
  constructor(
    @InjectRepository(BussinessObjectEntity)
    private readonly objectRepository: Repository<BussinessObjectEntity>,
  ) {}

  async getAll(profileId: number, bussinessId: number) {
    return await this.objectRepository.find({
      where: {
        profile: {
          id: profileId,
        },
        bussiness: {
          id: bussinessId,
        },
      },
    });
  }

  async create(
    dto: CreateBussinessObjectDto,
    profileId: number,
    bussinessId: number,
  ) {
    const profile = new UserProfileEntity();
    profile.id = profileId;
    const bussiness = new BussinessEntity();
    bussiness.id = bussinessId;
    const bussinessObject = new BussinessObjectEntity();
    bussinessObject.name = dto.name;
    bussinessObject.description = dto.description;
    bussinessObject.image = dto.image;
    bussinessObject.profile = profile;
    bussinessObject.bussiness = bussiness;
    return await this.objectRepository.save(bussinessObject);
  }

  async createTmp(bussiness: BussinessEntity, profile: UserProfileEntity) {
    const bussinessObject = new BussinessObjectEntity();
    bussinessObject.name = 'Temporary bussiness object name';
    bussinessObject.profile = profile;
    bussinessObject.bussiness = bussiness;
    return await this.objectRepository.save(bussinessObject);
  }
}

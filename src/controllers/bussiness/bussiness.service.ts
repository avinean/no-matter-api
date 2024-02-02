import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BussinessEntity, BussinessObjectEntity } from 'src/entities/Bussiness';
import { UserProfileEntity } from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class BussinessService {
  constructor(
    @InjectRepository(BussinessEntity)
    private readonly bussinessRepository: Repository<BussinessEntity>,
    @InjectRepository(BussinessObjectEntity)
    private readonly bussinessObjectRepository: Repository<BussinessObjectEntity>,
  ) {}

  async getAll() {
    return await this.bussinessRepository.find();
  }

  async getAllObjects() {
    return await this.bussinessObjectRepository.find();
  }

  async createTmp(profile: UserProfileEntity) {
    const bussiness = new BussinessEntity();
    bussiness.name = 'Temporary bussiness name';
    bussiness.profile = profile;
    return await this.bussinessRepository.save(bussiness);
  }

  async createObjectTmp(
    bussiness: BussinessEntity,
    profile: UserProfileEntity,
  ) {
    const bussinessObject = new BussinessObjectEntity();
    bussinessObject.name = 'Temporary bussiness object name';
    bussinessObject.profile = profile;
    bussinessObject.bussiness = bussiness;
    return await this.bussinessObjectRepository.save(bussinessObject);
  }
}

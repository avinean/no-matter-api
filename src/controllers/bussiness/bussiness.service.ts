import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BussinessEntity } from 'src/entities/Bussiness';
import { UserProfileEntity } from 'src/entities/User';
import { Repository } from 'typeorm';
import { CreateBussinessDto } from './bussiness.dto';

@Injectable()
export class BussinessService {
  constructor(
    @InjectRepository(BussinessEntity)
    private readonly bussinessRepository: Repository<BussinessEntity>,
  ) {}

  async getAll(profileId: number) {
    return await this.bussinessRepository.find({
      where: { profile: { id: profileId } },
      relations: {
        objects: true,
      },
    });
  }

  async create(dto: CreateBussinessDto, profileId: number) {
    const profile = new UserProfileEntity();
    profile.id = profileId;
    const bussiness = new BussinessEntity();
    bussiness.name = dto.name;
    bussiness.description = dto.description;
    bussiness.image = dto.image;
    bussiness.profile = profile;
    return await this.bussinessRepository.save(bussiness);
  }

  async createTmp(profile: UserProfileEntity) {
    const bussiness = new BussinessEntity();
    bussiness.name = 'Temporary bussiness name';
    bussiness.profile = profile;
    return await this.bussinessRepository.save(bussiness);
  }
}

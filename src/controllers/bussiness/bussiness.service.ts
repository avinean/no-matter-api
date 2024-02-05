import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BussinessEntity } from 'src/entities/bussiness.entity';
import { ProfileEntity } from 'src/entities/profile.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateBussinessDto } from './bussiness.dto';

@Injectable()
export class BussinessService {
  constructor(
    @InjectRepository(BussinessEntity)
    private readonly bussinessRepository: Repository<BussinessEntity>,
  ) {}

  async findAll(profileId: number) {
    return await this.bussinessRepository.find({
      where: { profile: { id: profileId } },
      relations: {
        objects: true,
      },
    });
  }

  async findOne(dto: FindOneOptions<BussinessEntity>) {
    return await this.bussinessRepository.findOne(dto);
  }

  async create(dto: CreateBussinessDto, profileId: number) {
    const profile = new ProfileEntity();
    profile.id = profileId;
    const bussiness = new BussinessEntity();
    bussiness.name = dto.name;
    bussiness.description = dto.description;
    bussiness.image = dto.image;
    bussiness.profile = profile;
    return await this.bussinessRepository.save(bussiness);
  }

  async createTmp(profile: ProfileEntity) {
    const bussiness = new BussinessEntity();
    bussiness.name = 'Temporary bussiness name';
    bussiness.profile = profile;
    return await this.bussinessRepository.save(bussiness);
  }
}

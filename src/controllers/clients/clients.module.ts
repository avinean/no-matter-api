import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity, ClientEntity } from 'src/entities/Client';
import { UserEntity } from 'src/entities/User';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity, ContactEntity, UserEntity]),
  ],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}

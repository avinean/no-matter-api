import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity, ClientEntity } from 'src/controllers/client/client.entity';
import { UserEntity } from 'src/controllers/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity, ContactEntity, UserEntity]),
  ],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}

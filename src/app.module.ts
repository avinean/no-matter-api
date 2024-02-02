import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserProfileEntity } from './entities/User';
import { UsersModule } from './controllers/users/users.module';
import { AuthModule } from './controllers/auth/auth.module';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { MaterialsModule } from './controllers/materials/materials.module';
import { MaterialEntity, MaterialTransactionEntity } from './entities/Material';
import { ContactEntity, ClientEntity } from './entities/Client';
import { ClientsModule } from './controllers/clients/clients.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SuggestionsModule } from './controllers/suggestions/suggestions.module';
import { ServiceEntity } from './entities/Services';
import { ServicesModule } from './controllers/services/services.module';
import { BookingModule } from './controllers/booking/booking.module';
import { BookingEntity } from './entities/Booking';
import { OrderEntity } from './entities/Order';
import { BussinessEntity, BussinessObjectEntity } from './entities/Bussiness';
import { BussinessModule } from './controllers/bussiness/bussiness.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: true,
      logger: 'simple-console',
      entities: [
        UserEntity,
        UserProfileEntity,
        ClientEntity,
        ContactEntity,
        MaterialEntity,
        MaterialTransactionEntity,
        ServiceEntity,
        BookingEntity,
        OrderEntity,
        BussinessEntity,
        BussinessObjectEntity,
      ],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      exclude: ['/api/(.*)'],
    }),
    UsersModule,
    AuthModule,
    MaterialsModule,
    ClientsModule,
    SuggestionsModule,
    ServicesModule,
    BookingModule,
    BussinessModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RoleGuard,
    },
    AppService,
  ],
})
export class AppModule {}

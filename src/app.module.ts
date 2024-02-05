import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserProfileEntity } from './entities/User';
import { UserModule } from './controllers/user/user.module';
import { AuthModule } from './controllers/auth/auth.module';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { MaterialModule } from './controllers/material/material.module';
import { MaterialEntity, MaterialTransactionEntity } from './entities/Material';
import { ContactEntity, ClientEntity } from './entities/Client';
import { ClientModule } from './controllers/client/client.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SuggestionsModule } from './controllers/suggestions/suggestions.module';
import { ServiceEntity } from './entities/Services';
import { ServicesModule } from './controllers/service/service.module';
import { BookingModule } from './controllers/booking/booking.module';
import { BookingEntity } from './entities/Booking';
import { OrderEntity } from './entities/Order';
import { BussinessEntity, BussinessObjectEntity } from './entities/Bussiness';
import { BussinessModule } from './controllers/bussiness/bussiness.module';
import { BussinessObjectsModule } from './controllers/bussiness-object/bussiness-object.module';
import { UtilModule } from './controllers/util/util.module';
import { PropertyGuard } from './guards/property.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // logging: true,
      // logger: 'simple-console',
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
    UserModule,
    AuthModule,
    MaterialModule,
    ClientModule,
    SuggestionsModule,
    ServicesModule,
    BookingModule,
    BussinessModule,
    BussinessObjectsModule,
    UtilModule,
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
    {
      provide: 'APP_GUARD',
      useClass: PropertyGuard,
    },
    AppService,
  ],
})
export class AppModule {}

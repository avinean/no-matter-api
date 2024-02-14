import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ProfileEntity } from './entities/profile.entity';
import { UserModule } from './controllers/user/user.module';
import { AuthModule } from './controllers/auth/auth.module';
import { AuthGuard } from './guards/auth.guard';
import { PermissionGuard } from './guards/permission.guard';
import { MaterialModule } from './controllers/material/material.module';
import { MaterialEntity } from './entities/material.entity';
import { ContactEntity, ClientEntity } from './entities/client.entity';
import { ClientModule } from './controllers/client/client.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SuggestionsModule } from './controllers/suggestions/suggestions.module';
import { ServiceEntity } from './entities/service.entity';
import { ServicesModule } from './controllers/service/service.module';
import { BookingModule } from './controllers/booking/booking.module';
import { BookingEntity } from './entities/booking.entity';
import { OrderEntity } from './entities/order.entity';
import { BussinessEntity } from './entities/bussiness.entity';
import { BussinessObjectEntity } from './entities/bussiness-object.entity';
import { BussinessModule } from './controllers/bussiness/bussiness.module';
import { BussinessObjectsModule } from './controllers/bussiness-object/bussiness-object.module';
import { UtilModule } from './controllers/util/util.module';
import { PropertyGuard } from './guards/property.guard';
import { InitializerModule } from './initializer/initializer.module';
import { RoleEntity } from './entities/role.entity';
import { PermissionEntity } from './entities/permission.entity';
import { RoleModule } from './controllers/role/role.module';
import { PermissionModule } from './controllers/permission/permission.module';
import { ProfileModule } from './controllers/profile/profile.module';
import { MaterialTransactionEntity } from './entities/material-transaction.entity';
import { MaterialTransactionModule } from './controllers/material-transaction/material-transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: ['query'],
      // logger: 'simple-console',
      entities: [
        UserEntity,
        ProfileEntity,
        ClientEntity,
        ContactEntity,
        MaterialEntity,
        MaterialTransactionEntity,
        ServiceEntity,
        BookingEntity,
        OrderEntity,
        BussinessEntity,
        BussinessObjectEntity,
        RoleEntity,
        PermissionEntity,
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
    InitializerModule,
    RoleModule,
    PermissionModule,
    ProfileModule,
    MaterialTransactionModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: PermissionGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: PropertyGuard,
    },
    AppService,
  ],
})
export class AppModule {}

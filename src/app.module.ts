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
import { BusinessEntity } from './entities/business.entity';
import { BusinessObjectEntity } from './entities/business-object.entity';
import { BusinessModule } from './controllers/business/business.module';
import { BusinessObjectsModule } from './controllers/business-object/business-object.module';
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
import { ServiceMaterialEntity } from './entities/service-material.entity';
import { ServiceMaterialModule } from './controllers/service-material/service-material.module';
import { OrderProductsEntity } from './entities/order-products.entity';
import { OrderProductsModule } from './controllers/order-products/order-products.module';
import { BookingStatusEntity } from './entities/booking-status.entity';
import { OrderModule } from './controllers/order/order.module';
import { OrderStatusEntity } from './entities/order-status.entity';
import { ScheduleEntity } from './entities/schedule.entity';
import { ScheduleModule } from './controllers/schedule/schedule.module';
import { CalendarEntity } from './entities/calendar.entity';
import { CalendarModule } from './controllers/calendar/calendar.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: ['error'],
      // logger: 'debug',
      entities: [
        UserEntity,
        ProfileEntity,
        ClientEntity,
        ContactEntity,
        MaterialEntity,
        MaterialTransactionEntity,
        ServiceEntity,
        ServiceMaterialEntity,
        BookingEntity,
        BookingStatusEntity,
        OrderProductsEntity,
        OrderEntity,
        OrderStatusEntity,
        BusinessEntity,
        BusinessObjectEntity,
        RoleEntity,
        PermissionEntity,
        ScheduleEntity,
        CalendarEntity,
      ],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
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
    BusinessModule,
    BusinessObjectsModule,
    UtilModule,
    InitializerModule,
    RoleModule,
    PermissionModule,
    ProfileModule,
    MaterialTransactionModule,
    ServiceMaterialModule,
    OrderProductsModule,
    OrderModule,
    ScheduleModule,
    CalendarModule,
    MailModule,
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

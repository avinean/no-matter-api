import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity, UserEntity } from './entities/User';
import { UsersModule } from './controllers/users/users.module';
import { AdminModule } from './controllers/admin/admin.module';
import { AuthModule } from './controllers/auth/auth.module';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AuthUrlsEntity } from './entities/AuthUrls';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: 'localhost',
      username: 'root',
      password: '11111111',
      database: 'api_db',
      entities: [UserEntity, RoleEntity, AuthUrlsEntity],
      synchronize: true,
    }),
    AdminModule,
    UsersModule,
    AuthModule,
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

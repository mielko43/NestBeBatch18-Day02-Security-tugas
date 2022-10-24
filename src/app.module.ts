import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './server/Auth/auth.module';
import { ServerModule } from './server/server.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'Batch18',
      entities: ['src/entities/*{.ts,.js}'],
      synchronize: false,
    }),
    ServerModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { BffModule } from './modules/bff/bff.module';

const envPath = ['.env'];
if(process.env.NODE_ENV === 'development'){
  envPath.unshift('.env.development');
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: envPath
    }),
    HealthCheckModule,
    BffModule
  ]
})
export class AppModule {}

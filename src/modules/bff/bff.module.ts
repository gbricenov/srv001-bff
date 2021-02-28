import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MetadataController } from './controllers/metadata/metadata.controller';
import { FarmaciasComunasService } from './services/farmacias-comunas/farmacias-comunas.service';
import { FarmaciasTurnoService } from './services/farmacias-turno/farmacias-turno.service';

@Module({
  imports:[
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: parseInt(configService.get<string>("CACHE_TTL_SECONDS_DEFAULT")), // seconds by default => 1hr por defecto
        max: parseInt(configService.get<string>("CACHE_MAX_ITEMS")) // maximum number of items in cache
      }),
      inject: [ConfigService]
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: parseInt(configService.get<string>("PROXY_TIMEOUT")),
        maxRedirects: parseInt(configService.get<string>("PROXY_MAX_REDIRECTS")),
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [MetadataController],
  providers: [FarmaciasComunasService, FarmaciasTurnoService]
})
export class BffModule {}

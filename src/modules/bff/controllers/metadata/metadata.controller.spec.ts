import { Test, TestingModule } from '@nestjs/testing';
import { MetadataController } from './metadata.controller';
import { FarmaciasComunasService } from '../../services/farmacias-comunas/farmacias-comunas.service';
import { FarmaciasTurnoService } from '../../services/farmacias-turno/farmacias-turno.service';
import { CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/common';

describe('MetadataController', () => {
  let controller: MetadataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

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
      providers: [FarmaciasComunasService,FarmaciasTurnoService ],
    }).compile();

    controller = module.get<MetadataController>(MetadataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

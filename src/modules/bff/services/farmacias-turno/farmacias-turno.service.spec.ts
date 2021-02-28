import { CacheModule, HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { FarmaciasTurnoService } from './farmacias-turno.service';

describe('FarmaciasTurnoService', () => {
  let service: FarmaciasTurnoService;

  const REGION_ID = "7";
  const URL_OBTENER_FARMACIAS_TURNO = "https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion?id_region=";
  const URL_ERROR_OBTENER_FARMACIAS_TURNO = "https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegionError?id_region=";

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
      providers: [FarmaciasTurnoService],
    }).compile();

    service = module.get<FarmaciasTurnoService>(FarmaciasTurnoService);
  });

  it('obtener una cantidad de registros exitosos', async () => {
    const formObj = {
      'comuna': 'BUIN',
      'nombreLocal': 'AHUMADA',
    }
    const url = URL_OBTENER_FARMACIAS_TURNO;
    const regionId = REGION_ID;
    const farmaciasTurno =  await service.getFarmaciasTurnoByRegion(formObj, url, regionId);
    expect(farmaciasTurno.length).toBeGreaterThan(0);
  });

  it('al usar una comuna de otra region no obtener resultados', async () => {
    const formObj = {
      'comuna': 'CALAMA',
      'nombreLocal': 'AHUMADA',
    }
    const url = URL_OBTENER_FARMACIAS_TURNO;
    const regionId = REGION_ID;
    const farmaciasTurno =  await service.getFarmaciasTurnoByRegion(formObj, url, regionId);
    expect(farmaciasTurno.length).toBe(0);
  });

  it('error de la url para obtener las farmacias de turno', async () => {
    expect.assertions(1);
    const formObj = {
      'comuna': 'BUIN',
      'nombreLocal': 'AHUMADA',
    }
    const urlErronea = URL_ERROR_OBTENER_FARMACIAS_TURNO;
    const regionId = REGION_ID;
    const actual =  service.getFarmaciasTurnoByRegion(formObj, urlErronea, regionId);
    await expect(actual).rejects.toEqual(
      Error( 'No es posible conectarse con la API de Farmanet, o bien, ocurrieron errores internos.')
    );
  });

  it('nombres de local y comuna indiferente a mayusculas o minusculas para obtener datos', async () => {
    expect.assertions(1);
    const formObjMinus = {
      'comuna': 'providencia',
      'nombreLocal': 'cruz verde',
    }
    const formObjMayus = {
      'comuna': 'PROVIDENCIA',
      'nombreLocal': 'CRUZ VERDE',
    }
    const url = URL_OBTENER_FARMACIAS_TURNO;
    const regionId = REGION_ID;
    const farmaciasTurnoMinus =  await service.getFarmaciasTurnoByRegion(formObjMinus, url, regionId);
    const farmaciasTurnoMayus =  await service.getFarmaciasTurnoByRegion(formObjMayus, url, regionId);
    expect(farmaciasTurnoMinus).toEqual(farmaciasTurnoMayus);
  });

});

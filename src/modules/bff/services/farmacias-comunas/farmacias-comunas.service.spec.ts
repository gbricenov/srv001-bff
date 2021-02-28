import { CacheModule, HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { FarmaciasComunasService } from './farmacias-comunas.service';

describe('FarmaciasComunasService', () => {
  let service: FarmaciasComunasService;

  const REGION_ID = "7";
  const REGION_ID_ERROR = "80";
  const URL_OBTENER_COMUNAS = "https://farmanet.minsal.cl/maps/index.php/utilidades/maps_obtener_comunas_por_regiones";
  const URL_OBTENER_COMUNAS_ERROR = "https://farmanet.minsal.cl/maps/index.php/utilidades/maps_obtener_comunas_por_regiones_error";

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
      providers: [FarmaciasComunasService],
    }).compile();

    service = module.get<FarmaciasComunasService>(FarmaciasComunasService);
  });

  it('obtener todas las comunas', async () => {
    const url = URL_OBTENER_COMUNAS; 
    const regionId = REGION_ID;
    const comunas =  await service.getComunasMetropolitanas(url, regionId);
    expect(comunas.length).toBeGreaterThan(0);
  });

  it('si el id region esta fuera de rango solo traer un objeto -> seleccionar comuna', async () => {
    const url = URL_OBTENER_COMUNAS; 
    const regionId = REGION_ID_ERROR;
    const comunas =  await service.getComunasMetropolitanas(url, regionId);
    expect(comunas.length).toBe(1);
  });

  it('error de la url para obtener todas las comunas', async () => {
    expect.assertions(1);
    const urlErronea = URL_OBTENER_COMUNAS_ERROR;
    const regionId = REGION_ID;
    const actual = service.getComunasMetropolitanas(urlErronea, regionId)
    await expect(actual).rejects.toEqual(
      Error( 'No es posible conectarse con la API de Farmanet, o bien, ocurrieron errores internos')
    );
  });

});

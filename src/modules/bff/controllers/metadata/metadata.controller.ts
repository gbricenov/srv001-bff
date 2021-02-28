import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ComunaDto } from '../../dtos/comuna.dto';
import { FarmaciaTurnoDto } from '../../dtos/farmacia-turno.dto';
import { FarmaciaTurnoModel } from '../../models/farmacia-turno.model';
import { FarmaciasComunasService } from '../../services/farmacias-comunas/farmacias-comunas.service';
import { FarmaciasTurnoService } from '../../services/farmacias-turno/farmacias-turno.service';

@ApiTags('Metadata')
@Controller('metadata')
export class MetadataController {

    constructor(
        private readonly farmaciasComunaService: FarmaciasComunasService,
        private readonly farmaciasTurnoService: FarmaciasTurnoService,        
    ){}

    @ApiOkResponse({ 
        description: 'Obtención de comunas metropolitanas',
        type: ComunaDto 
    })
    @Get('comunas-metropolitanas')
    async getComunasMetropolitana(): Promise <ComunaDto[] >{
        const proxyObtenerComunas : string  = process.env.URL_ENDPOINT_PROXY_OBTENER_COMUNAS_DE_REGION;
        const regionId : string  = process.env.REGION_ID;
        return this.farmaciasComunaService.getComunasMetropolitanas(proxyObtenerComunas, regionId);
    }

    @ApiOkResponse({ 
        description: 'Obtención de farmacias de turno metropolitanas en base a la comuna o nombre del local',
        type: FarmaciaTurnoDto 
    })
    @Post('farmacias-turno-metropolitanas')
    async getFarmaciasTurnoByRegion( @Body() farmaciaTurno: FarmaciaTurnoModel): Promise <FarmaciaTurnoDto[] >{
        const proxyObtenerFarmaciasTurno : string  = process.env.URL_ENDPOINT_PROXY_OBTENER_FARMACIAS_TURNO_POR_REGION;
        const regionId : string  = process.env.REGION_ID;
        return this.farmaciasTurnoService.getFarmaciasTurnoByRegion(farmaciaTurno, proxyObtenerFarmaciasTurno, regionId);
    }
}

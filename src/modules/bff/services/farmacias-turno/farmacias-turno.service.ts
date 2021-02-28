import { Injectable, HttpService, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { FarmaciaTurnoDto } from '../../dtos/farmacia-turno.dto';
import { FarmaciaTurnoMapper } from '../../mappers/farmacia-turno.mapper';
import { FarmaciaTurnoModel } from '../../models/farmacia-turno.model';

@Injectable()
export class FarmaciasTurnoService {

    constructor(private readonly httpService: HttpService){}

    private readonly logger = new Logger(FarmaciasTurnoService.name);

    async getFarmaciasTurnoByRegion(farmaciaTurno: FarmaciaTurnoModel, proxyObtenerFarmaciasTurno: string, regionId: string): Promise<FarmaciaTurnoDto[]> {    

        let farmaciasTurno: FarmaciaTurnoDto[];
        let response: any;

        if(!farmaciaTurno.nombreLocal && !farmaciaTurno.comuna){
            throw new HttpException('Debe ingresar al menos un filtro para su busqueda', HttpStatus.BAD_REQUEST);
        }

        try {

            response = (await this.httpService.get(`${proxyObtenerFarmaciasTurno}${regionId}`).toPromise()).data;       
            
            if(response != null) {

                if(farmaciaTurno.comuna){
                    response = response.filter((farmacia)=>{
                        if(farmacia)
                            return farmacia.comuna_nombre.toLowerCase() === farmaciaTurno.comuna.toLowerCase();
                    });
                }

                if(farmaciaTurno.nombreLocal){
                    response = response.filter((farmacia)=>{
                        if(farmacia)
                            return farmacia.local_nombre.toLowerCase() === farmaciaTurno.nombreLocal.toLowerCase();
                    });
                }
                
                farmaciasTurno = response.map(
                    (farmacia)=>{
                        return FarmaciaTurnoMapper.buildFarmaciaTurnoDto(farmacia);
                    }
                );
            }
        }
        catch (err) {
            this.logger.warn(`Problemas internos - ${err}`);
            const error = (err.response && err.response.status) ? err.response.status : HttpStatus.INTERNAL_SERVER_ERROR;
            throw new HttpException('No es posible conectarse con la API de Farmanet, o bien, ocurrieron errores internos.', error);
        } 

        return farmaciasTurno;
        
    }
}

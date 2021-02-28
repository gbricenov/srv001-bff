import { HttpException, HttpService, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as FormData from 'form-data';
import { ComunaDto } from '../../dtos/comuna.dto';
const jsdom = require('jsdom');

@Injectable()
export class FarmaciasComunasService {

    constructor(private readonly httpService: HttpService){}

    private readonly logger = new Logger(FarmaciasComunasService.name);
    
    async getComunasMetropolitanas(proxyObtenerComunas: string, regionId: string): Promise<ComunaDto[]> {    

        let comunasMetropolitanas: ComunaDto[];
        
        try {
            
            let response: any;
            const form = new FormData;
            form.append('reg_id', regionId);

            response = await this.httpService.post(`${proxyObtenerComunas}`, form, {headers: form.getHeaders()}).toPromise();       
            
            if(response != null) { 

                let comunas = response.data;
                comunas = comunas.split('</option>'); 
                const { JSDOM } = jsdom;
                
                comunas =  comunas.map( (comuna : any)=> {
                    if(comuna){
                        
                        comuna = comuna + "</option>";
                        const dom = new JSDOM(comuna);
                        const texto =  dom.window.document.querySelector("option").textContent;
                        const valor =  dom.window.document.querySelector("option").value;
                        
                        const comunaDto = new ComunaDto();
                        comunaDto.idComuna = valor;
                        comunaDto.nombreComuna = texto;
                        
                        if(comunaDto) 
                            return comunaDto;
                    }
                });

                comunasMetropolitanas = comunas.filter(function (el) {
                    return el != null;
                });
            }
            
        }
        catch (err) {
            this.logger.warn(`Problemas internos - ${err}`);
            const error = (err.response && err.response.status) ? err.response.status : HttpStatus.INTERNAL_SERVER_ERROR;
            throw new HttpException('No es posible conectarse con la API de Farmanet, o bien, ocurrieron errores internos', error);
        } 

        return comunasMetropolitanas;
        
    }
}

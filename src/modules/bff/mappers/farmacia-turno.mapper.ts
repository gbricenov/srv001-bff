/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FarmaciaTurnoDto } from '../dtos/farmacia-turno.dto';

export class FarmaciaTurnoMapper {

    public static buildFarmaciaTurnoDto(farmaciaTurno: any): FarmaciaTurnoDto {
        
        const farmaciaTurnoDto = new FarmaciaTurnoDto();
        
        farmaciaTurnoDto.idRegion = farmaciaTurno.fk_region
        farmaciaTurnoDto.idComuna = farmaciaTurno.fk_comuna
        farmaciaTurnoDto.nombreComuna = farmaciaTurno.comuna_nombre
        farmaciaTurnoDto.idLocal = farmaciaTurno.local_id
        farmaciaTurnoDto.nombreLocal = farmaciaTurno.local_nombre
        farmaciaTurnoDto.nombreLocalidad = farmaciaTurno.localidad_nombre
        farmaciaTurnoDto.direccionLocal = farmaciaTurno.local_direccion
        farmaciaTurnoDto.fecha = farmaciaTurno.fecha
        farmaciaTurnoDto.funcionamientoHorarioApertura = farmaciaTurno.funcionamiento_hora_apertura
        farmaciaTurnoDto.funcionamientoHorarioCierre = farmaciaTurno.funcionamiento_hora_cierre
        farmaciaTurnoDto.funcionamientoDia = farmaciaTurno.funcionamiento_dia
        farmaciaTurnoDto.telefonoLocal = farmaciaTurno.local_telefono
        farmaciaTurnoDto.latitudLocal = farmaciaTurno.local_lat
        farmaciaTurnoDto.longitudLocal = farmaciaTurno.local_lng

        return farmaciaTurnoDto;
    }

}
import { ApiProperty } from "@nestjs/swagger";

export class FarmaciaTurnoDto {

  @ApiProperty()
  idRegion: number;

  @ApiProperty()
  idComuna: number;

  @ApiProperty()
  nombreComuna: string;

  @ApiProperty()
  idLocal: number;

  @ApiProperty()
  nombreLocal: string;

  @ApiProperty()
  nombreLocalidad: string;

  @ApiProperty()
  direccionLocal: string;

  @ApiProperty()
  fecha: Date;

  @ApiProperty()
  funcionamientoHorarioApertura: string;

  @ApiProperty()
  funcionamientoHorarioCierre: string;

  @ApiProperty()
  funcionamientoDia: string;

  @ApiProperty()
  telefonoLocal: string;

  @ApiProperty()
  latitudLocal: string;

  @ApiProperty()
  longitudLocal: string;
}
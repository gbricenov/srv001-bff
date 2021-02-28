import { ApiProperty } from "@nestjs/swagger";

export class ComunaDto {
    
  @ApiProperty()
  idComuna: number;

  @ApiProperty()
  nombreComuna: string;
}
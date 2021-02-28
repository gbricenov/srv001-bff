import { IsString, MaxLength, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class FarmaciaTurnoModel {
    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(100, {
        message: "excede el tamaño máximo"
    })
    readonly comuna: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(100, {
        message: "excede el tamaño máximo"
    })
    readonly nombreLocal: string;

}
import { ApiProperty } from "@nestjs/swagger";

export class HealthDto {
    constructor(status: string){
        this.status = status;
    }
    @ApiProperty()
    status: string;
}
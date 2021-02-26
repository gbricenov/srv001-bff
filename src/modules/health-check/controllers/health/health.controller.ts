import { Controller, Get } from '@nestjs/common';
import { HealthDto } from '../../dtos/health.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
    @Get()
    getHealt(): HealthDto {
        return new HealthDto("ok")
    }
}

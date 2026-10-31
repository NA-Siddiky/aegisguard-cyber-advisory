import { Controller, Get } from '@nestjs/common';
import { ThreatsService, StrideThreat, DfdComponent } from './threats.service';

@Controller('api/threats')
export class ThreatsController {
  constructor(private readonly threatsService: ThreatsService) {}

  @Get()
  getThreats(): StrideThreat[] {
    return this.threatsService.getThreats();
  }

  @Get('dfd')
  getDfd(): DfdComponent[] {
    return this.threatsService.getDfd();
  }
}

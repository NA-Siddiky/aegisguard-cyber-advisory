import { Controller, Get } from '@nestjs/common';
import { NistService, NistFunctionAssessment } from './nist.service';

@Controller('api/nist')
export class NistController {
  constructor(private readonly nistService: NistService) {}

  @Get()
  getAssessment(): NistFunctionAssessment[] {
    return this.nistService.getAssessment();
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { RoadmapService, RoadmapPhase, RoadmapInitiative } from './roadmap.service';

@Controller('api/roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Get()
  getRoadmap(@Query('phase') phase?: RoadmapPhase): RoadmapInitiative[] {
    if (phase) {
      return this.roadmapService.getInitiativesByPhase(phase);
    }
    return this.roadmapService.getAllInitiatives();
  }
}

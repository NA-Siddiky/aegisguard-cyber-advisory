import { Module } from '@nestjs/common';
import { ControlsController } from './controls/controls.controller';
import { ControlsService } from './controls/controls.service';
import { RoadmapController } from './roadmap/roadmap.controller';
import { RoadmapService } from './roadmap/roadmap.service';
import { NistController } from './nist/nist.controller';
import { NistService } from './nist/nist.service';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { ThreatsController } from './threats/threats.controller';
import { ThreatsService } from './threats/threats.service';

@Module({
  imports: [],
  controllers: [
    ControlsController,
    RoadmapController,
    NistController,
    ProfileController,
    ThreatsController
  ],
  providers: [
    ControlsService,
    RoadmapService,
    NistService,
    ProfileService,
    ThreatsService
  ]
})
export class AppModule {}

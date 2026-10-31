import { Controller, Get, Query } from '@nestjs/common';
import { ControlsService, ControlCategory, SecurityControl } from './controls.service';

@Controller('api/controls')
export class ControlsController {
  constructor(private readonly controlsService: ControlsService) {}

  @Get()
  getControls(@Query('category') category?: ControlCategory): SecurityControl[] {
    if (category) {
      return this.controlsService.getControlsByCategory(category);
    }
    return this.controlsService.getAllControls();
  }
}

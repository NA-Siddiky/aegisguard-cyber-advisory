import { Controller, Get } from '@nestjs/common';
import { ProfileService, ClientProfile, AssetRegisterItem } from './profile.service';

@Controller('api')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('profile')
  getProfile(): ClientProfile {
    return this.profileService.getProfile();
  }

  @Get('assets')
  getAssets(): AssetRegisterItem[] {
    return this.profileService.getAssets();
  }
}

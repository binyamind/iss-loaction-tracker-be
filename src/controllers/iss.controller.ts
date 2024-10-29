import { Controller, Get } from '@nestjs/common';
import { IssServie } from 'src/services/issServices/iss.service.service';

@Controller()
export class IssController {
  constructor(private issService: IssServie) {}
  @Get('countries')
  async findAllCountries() {
    return this.issService.findAll();
  }
  @Get('current-location')
  async findIssCurrnetLocation(){
    return await this.issService.findIssCurrnetLocation()
  }
  @Get('utm-zone')
  async findIssUtmZone(){
    return await this.issService.findIssUtmZone()
  }
}

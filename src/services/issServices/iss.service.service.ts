import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import {
  ISS_CURRENT_LOCATION,
  ISS_MAPPER_V1,
  ISS_REPOSITORY_V1,
} from 'src/constanst';
import { IssMapperDto } from 'src/mappers/issMapper/iss.mapper.dto';
import { Countries } from 'src/models/countries';
import { Country } from 'src/models/country';
import { currentLocationResponse } from 'src/models/currentLocationReposne';
import { UtmZoneResponse } from 'src/models/utmZoneResponse';
import { IssRepositoryDto } from 'src/repositories/issRepositories/iss.repository.dot';
import { IssCurrentLocationService } from 'src/requests/issCurrentLocation/iss.currentLocation.service';

@Injectable()
export class IssServie {
  constructor(
    @Inject(ISS_REPOSITORY_V1) private issRepository: IssRepositoryDto,
    @Inject(ISS_MAPPER_V1)
    private issMapper: IssMapperDto<
      Country[],
      Countries,
      currentLocationResponse,
      UtmZoneResponse
    >,
    @Inject(ISS_CURRENT_LOCATION)
    private issCurrentLocation: IssCurrentLocationService,
  ) {}
  async getCurrentIssLocation() {
    return await this.issCurrentLocation.getCurrentIssLocation();
  }
  async findIssCurrnetLocation(withGraphqlMap?: boolean) {
    const data = await this.getCurrentIssLocation();
    const country = await this.issRepository.getIssCurrntCoutnryByLocation(
      {
        latitude: data.iss_position.latitude,
        longitude: data.iss_position.longitude,
      },
      data.message,
      data.timestamp,
    );
    return await this.issMapper.mapToCurrentCountry(country, withGraphqlMap);
  }
  async findAll() {
    const data = await this.issRepository.getCountries();

    if (!data) throw new NotFoundException('No data found');
    return this.issMapper.mapToCountries(data);
  }
  async findIssUtmZone(): Promise<UtmZoneResponse> {
    const data = await this.getCurrentIssLocation();
    const utmZone = await this.issRepository.findIssUtmZone(data.iss_position);
    return await this.issMapper.mapToUTMZone(utmZone);
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RequestsHelperService } from 'src/helpers/iss.currentLocation.service';
import { IssCurrntLocationDto } from './iss.currentLocation.dto';
import { IssCurrentLocationApiResponse } from 'src/models/issCurrentLocationApiResponse';

@Injectable()
export class IssCurrentLocationService implements IssCurrntLocationDto {
  constructor(private readonly requestsService: RequestsHelperService) {}

  async getCurrentIssLocation(): Promise<IssCurrentLocationApiResponse> {
    try {
      return await this.requestsService.get('');
    } catch (error) {
      throw new InternalServerErrorException('Postion not found',error);
    }
  }
}

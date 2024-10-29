import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RequestsHelperService {
  constructor(private readonly httpService: HttpService) {}
  
  async get<T>(path: string, params?: any): Promise<T> {
    const response$ = this.httpService.get<T>(path, { params });
    const response = await lastValueFrom(response$);
    return response.data;
  }
}

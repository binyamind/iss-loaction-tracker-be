import { HttpModule, HttpModuleOptions } from '@nestjs/axios';
import { DynamicModule } from '@nestjs/common';
import { ISS_LOCATION_BASE_URL } from 'src/constanst';
import { RequestsHelperService } from './iss.currentLocation.service';

export class RequetsHelperModule {
  static forRoot(): DynamicModule {
    return {
      module: RequetsHelperModule,
      imports: [
        HttpModule.registerAsync({
          useFactory: async (): Promise<HttpModuleOptions | any> => {
            return {
              timeout: 10000,
              maxRedirects: 5,
              baseURL: ISS_LOCATION_BASE_URL,
            };
          },
        }),
      ],
      exports: [HttpModule, RequestsHelperService],
      providers: [RequestsHelperService],
    };
  }
}

import { DynamicModule } from '@nestjs/common';
import { RequetsHelperModule } from 'src/helpers/requst.helpers.module';
import { IssCurrentLocationService } from './iss.currentLocation.service';
import { ISS_CURRENT_LOCATION } from 'src/constanst';

export class IssCurrentLocationModule {
  static forRoot(): DynamicModule {
    return {
      module: IssCurrentLocationModule,
      imports: [RequetsHelperModule.forRoot()],
      providers: [
        {
          provide: ISS_CURRENT_LOCATION,
          useClass: IssCurrentLocationService,
        },
      ],
      exports: [ISS_CURRENT_LOCATION],
    };
  }
}

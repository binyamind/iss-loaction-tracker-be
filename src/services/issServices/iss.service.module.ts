import { DynamicModule } from '@nestjs/common';
import { IssServie } from './iss.service.service';
import { IssRepositoryModule } from 'src/repositories/issRepositories/iss.repository.module';
import { IssMapperModule } from 'src/mappers/issMapper/iss.mapper.module';
import { IssCurrentLocationModule } from 'src/requests/issCurrentLocation/iss.currentLocation.module';
import { RequetsHelperModule } from 'src/helpers/requst.helpers.module';

export class IssServiceModule {
  static forRoot(): DynamicModule {
    return {
      imports: [
        IssRepositoryModule.forRoot(),
        IssMapperModule.forRoot(),
        IssCurrentLocationModule.forRoot(),
      ],
      module: IssServiceModule,
      providers: [IssServie],
      exports: [IssServie],
    };
  }
}

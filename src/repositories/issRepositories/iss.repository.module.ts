import { DynamicModule } from '@nestjs/common';
import { ISS_REPOSITORY_V1 } from 'src/constanst';
import { IssRepository } from './iss.repository.service';

export class IssRepositoryModule {
  static forRoot(): DynamicModule {
    return {
      module: IssRepositoryModule,
      providers: [
        {
          provide: ISS_REPOSITORY_V1,
          useClass: IssRepository,
        },
      ],
      exports: [ISS_REPOSITORY_V1],
    };
  }
}

import { DynamicModule } from '@nestjs/common';
import { ISS_MAPPER_V1 } from 'src/constanst';
import { IssMapperService } from './iss.mapper.service';

export class IssMapperModule {
  static forRoot(): DynamicModule {
    return {
      module: IssMapperModule,
      exports: [ISS_MAPPER_V1],
      providers: [
        {
          provide: ISS_MAPPER_V1,
          useClass: IssMapperService,
        },
      ],
    };
  }
}

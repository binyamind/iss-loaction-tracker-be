import { Field, ObjectType } from '@nestjs/graphql';
import { Country } from './country';
import { Postion } from './issCurrentLocationApiResponse';

@ObjectType()
export class CountryPostion {
  @Field((type) => Country)
  country: Country;
  @Field((type) => Date)
  timeStamp: Date;
  @Field((type) => Postion)
  postion: Postion;
  @Field((type) => [String])
  lastHourVisitedCountries?: Array<string>;
}

import { CountryPostion } from 'src/models/countryPostion';
import { UtmZone } from 'src/models/utmZone';
import { UtmZoneResponse } from 'src/models/utmZoneResponse';

export interface IssMapperDto<J, T, country, zone> {
  mapToCountries(data: J): Promise<T>;
  mapToCurrentCountry(
    data: CountryPostion | undefined,
    withGraphqlMap?: boolean,
  ): Promise<country>;
  mapToUTMZone(data: UtmZone): Promise<zone>;
}

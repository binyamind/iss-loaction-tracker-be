import { Countries } from 'src/models/countries';
import { Country } from 'src/models/country';
import { CountryPostion } from 'src/models/countryPostion';
import { IssCurrentLocationApiResponse, Postion } from 'src/models/issCurrentLocationApiResponse';
import { UtmZone } from 'src/models/utmZone';

export interface IssRepositoryDto {
  findIssUtmZone(postion: Postion): Promise<UtmZone>;
  getCountries(): Promise<Country[]>;
  getIssCurrntCoutnryByLocation(postion: Postion ,success: string, timeStamp:Date): Promise<CountryPostion>;
}

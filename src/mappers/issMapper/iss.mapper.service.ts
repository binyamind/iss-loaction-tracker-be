import { Injectable } from '@nestjs/common';
import { IssMapperDto } from './iss.mapper.dto';
import { Countries } from 'src/models/countries';
import { currentLocationResponse } from 'src/models/currentLocationReposne';
import { UtmZoneResponse } from 'src/models/utmZoneResponse';
import { UtmZone } from 'src/models/utmZone';
import { Country, MultiPolygon, Polygon } from 'src/models/country';
import { CountryPostion } from 'src/models/countryPostion';
import { Poly } from 'src/models/PolyEnum';

@Injectable()
export class IssMapperService
  implements
    IssMapperDto<
      Country[],
      Countries,
      currentLocationResponse,
      UtmZoneResponse
    >
{
  async mapToCountries(data: Country[]): Promise<Countries> {
    return {
      countries: data,
    };
  } 
  getCoordinates(coordinates: Polygon | MultiPolygon, type: Poly | null) {
    if (!type) return null;

    if (coordinates.coordinates?.length === 0) return null;
    const currentCoordinates =
      type === Poly.Polygon
        ? {
            __typename: 'Polygon',
            coordinates: coordinates[0],
          }
        : {
            __typename: 'MultiPolygon',
            coordinates:
              Array.isArray(coordinates) && coordinates.map((item) => item[0]),
          };

    return currentCoordinates;
  }
  async mapToCurrentCountry(
    data: CountryPostion,
    withGraphqlMap?: boolean,
  ): Promise<currentLocationResponse> {
    if (withGraphqlMap) {
      const gqlCoordinates = this.getCoordinates(
        data.country.coordinates,
        data.country.type,
      );
      return {
        currentLocation: {
          ...data,
          country: {
            id: data.country.id,
            name: data.country.name,
            type: data.country.type,
            coordinates: gqlCoordinates,
          },
        },
      };
    }
    return {
      currentLocation: data,
    };
  }
  async mapToUTMZone(data: UtmZone): Promise<UtmZoneResponse> {
    return {
      zone: data,
    };
  }
}

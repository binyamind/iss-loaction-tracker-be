import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IssRepositoryDto } from './iss.repository.dot';
import * as db from '../../db/countries.geo.json';
import { GEOLocation } from 'src/models/dbModels';
import { Countries } from 'src/models/countries';
import { Postion } from 'src/models/issCurrentLocationApiResponse';
import { booleanPointInPolygon, point, polygon } from '@turf/turf';
import { Poly } from 'src/models/PolyEnum';
import { fromLatLon } from 'utm';
import { UtmZone } from 'src/models/utmZone';
import { Country, MultiPolygon } from 'src/models/country';
import { CountryPostion } from 'src/models/countryPostion';

@Injectable()
export class IssRepository implements IssRepositoryDto {
  private _db: GEOLocation = db;
  private visitedCountriesMap = {};
  async getCountries(): Promise<Country[]> {
    const countries = this._db.features.map(
      ({ properties, geometry, id }): Country => {
        const { name } = properties;
        return {
          id,
          name,
          type: geometry.type as Poly,
          coordinates: {
            coordinates: geometry.coordinates 
          },
        };
      },
    );
    return countries;
  }
  private getTime(currentTime: Date) {
    const date = new Date(currentTime);
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).format(date);
  }
  removeNonLastHourKeys(currentTime: number) {
    const oneHourAgo = currentTime - 60 * 60 * 1000;
    this.visitedCountriesMap = Object.fromEntries(
      Object.entries(this.visitedCountriesMap).filter(([key]) => {
        return Number(key) >= oneHourAgo;
      }),
    );
  }
  calculateIssLastHourVistis(currentTime: Date, countryName: string) {
    this.removeNonLastHourKeys(Number(currentTime));
    this.visitedCountriesMap[currentTime.toString()] = countryName;
  }
  private buildPostion(
    country: Country,
    postion: Postion,
    timeStamp: Date,
  ): CountryPostion {
    this.calculateIssLastHourVistis(timeStamp, country.name);
    const removeDuplicateValues = new Set(Object.values(this.visitedCountriesMap));
    return {
      country: {
        coordinates: country.coordinates,
        id: country.id,
        name: country.name,
        type: country.type,
      },
      postion,
      timeStamp,
      lastHourVisitedCountries: [...removeDuplicateValues] as string[]
    };
  }
  async getIssCurrntCoutnryByLocation(
    postion: Postion,
    success: string,
    timeStamp: Date,
  ): Promise<CountryPostion> {
    if (success !== 'success')
      throw new InternalServerErrorException('postion not found!');
    const pointGeoJSON = point([
      parseFloat(postion.longitude),
      parseFloat(postion.latitude),
    ]);
    for (const feature of this._db.features) {
      if (feature.geometry.type === Poly.Polygon) {
        if (booleanPointInPolygon(pointGeoJSON, feature.geometry as any)) {
          
          return this.buildPostion(
            {
              coordinates: feature.geometry.coordinates as any,
              id: feature.id,
              name: feature.properties.name,
              type: feature.geometry.type,
            },
            postion,
            timeStamp,
          );
        }
      }
      if (feature.geometry.type === Poly.MultiPolygon) {
        for (const coordinates of feature.geometry.coordinates) {
          const polygon = {
            type: 'Polygon',
            coordinates: coordinates,
          };
          if (booleanPointInPolygon(pointGeoJSON,polygon as any)) {
            console.log("hereeeeeeeeeeeeeeeeee",coordinates)
            return this.buildPostion(
              {
                coordinates: feature.geometry.coordinates as any,
                id: feature.id,
                name: feature.properties.name,
                type: feature.geometry.type,
              },
              postion,
              timeStamp,
            );
          }
        }
      }
    }
    return this.buildPostion(
      {
        coordinates:[] as any,
        id: 'Ocean',
        name: 'Ocean',
      },
      postion,
      timeStamp,
    );
  }

  async findIssUtmZone(postion: Postion): Promise<UtmZone> {
    const utmZone = fromLatLon(
      parseFloat(postion.latitude),
      parseFloat(postion.longitude),
    );

    return utmZone;
  }
}

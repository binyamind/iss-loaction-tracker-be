import { OnModuleInit } from '@nestjs/common';
import { Resolver, Query, ResolveField, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { GQLCountries } from 'src/entities/GQLCountries.entity';
import { GQLCurrentLocation } from 'src/entities/GQLCurrentLocation.entity';
import { Poly } from 'src/models/PolyEnum';
import { IssServie } from 'src/services/issServices/iss.service.service';

@Resolver()
export class IssResolver implements OnModuleInit {
  private pubSub: PubSub;
  constructor(private issService: IssServie) {
    this.pubSub = new PubSub();
  }
  onModuleInit() {
    this.emitLocationUpdates();
  }
  async emitLocationUpdates() {
    setInterval(async () => {
      try {
        const { currentLocation } =
          await this.issService.findIssCurrnetLocation(true);
        this.pubSub.publish('currentLocation', {
          currentLocation,
        });
      } catch (error) {
        console.error("Error fetching ISS current location:", error);
      }
    }, 5000);
  }
  @Query(() => GQLCountries)
  async findAllCountries() {
    const result = await this.issService.findAll();
    const mapResultToGraphResponse = result.countries.map((resultItem) => {
      const coordinates =
        resultItem.type === Poly.Polygon
          ? {
              __typename: 'Polygon',
              coordinates: resultItem.coordinates.coordinates[0],
            }
          : {
              __typename: 'MultiPolygon',
              coordinates: resultItem.coordinates.coordinates.map((i) => i[0]),
            };
      return {
        ...resultItem,
        coordinates: coordinates ? coordinates : [],
      };
    });
    return {
      countries: mapResultToGraphResponse,
    };
  }

  @Query(() => GQLCurrentLocation)
  async findIssCurrnetLocation() {
    const { currentLocation } = await this.issService.findIssCurrnetLocation(
      true,
    );
    this.pubSub.publish('currentLocation', currentLocation);
    return {
      currentLocation,
    };
  }
  @Subscription(() => GQLCurrentLocation, {
    resolve: (payload) => payload,
  })
  currentLocationUpdate() {
    return this.pubSub.asyncIterator('currentLocation');
  }

  async findIssUtmZone() {
    return await this.issService.findIssUtmZone();
  }
}

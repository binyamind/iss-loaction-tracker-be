import {
  createUnionType,
  CustomScalar,
  Field,
  Float,
  Int,
  ObjectType,
  Scalar,
} from '@nestjs/graphql';
import { Poly } from './PolyEnum';

@ObjectType()
export class Polygon {
  @Field(() => [[Float]])
  public coordinates: number[][];
}

@ObjectType()
export class MultiPolygon {
  @Field(() => [[[Float]]])
  public coordinates: number[][][];
}

export const CoordinatesUnion = createUnionType({
  name: 'CoordinatesUnion',
  types: () => [Polygon, MultiPolygon] as const,
  resolveType: (obj) => {
    if (obj.__typename === 'Polygon') return Polygon;
    return MultiPolygon;
  },
});

@ObjectType()
export class Country {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => CoordinatesUnion ,{nullable: true})
  coordinates?: typeof CoordinatesUnion;

  @Field(() => Poly, { nullable: true })
  type?: Poly;
}

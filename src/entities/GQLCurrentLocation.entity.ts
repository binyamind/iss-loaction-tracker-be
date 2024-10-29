import { Field, ObjectType } from "@nestjs/graphql";
import { CountryPostion } from "src/models/countryPostion";

@ObjectType()
export class GQLCurrentLocation {
  @Field((type) => CountryPostion)
  currentLocation: CountryPostion;
}


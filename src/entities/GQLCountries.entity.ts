import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Country } from "src/models/country";
import { Poly } from "src/models/PolyEnum";


@ObjectType() 
export class GQLCountries {
  @Field(() => [Country]) 
  countries: Country[];
}

registerEnumType(Poly, {
  name: "Poly", 
  description: "The different types of polygons", 
});
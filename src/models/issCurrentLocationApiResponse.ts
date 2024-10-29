import { Field, ObjectType } from '@nestjs/graphql';

export interface IssCurrentLocationApiResponse {
  timestamp: Date;
  iss_position: Postion;
  message: string;
}
@ObjectType()
export class Postion {
  @Field(() => String)
  latitude: string;
  @Field(() => String)
  longitude: string;
}

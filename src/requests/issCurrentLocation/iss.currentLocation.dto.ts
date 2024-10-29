import { IssCurrentLocationApiResponse } from "src/models/issCurrentLocationApiResponse";

export interface IssCurrntLocationDto {
  getCurrentIssLocation(): Promise<IssCurrentLocationApiResponse>;
}

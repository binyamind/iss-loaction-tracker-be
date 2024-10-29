export interface GEOLocation {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: string;
  id: string;
  properties: Properties;
  geometry: Geometry;
}

export interface Properties {
  name: string;
}

export interface Geometry {
  type: string;
  coordinates: any[][][];
}

export interface NextStation {
  stationIndex: number;
  weight: number;
  line: string;
}
export interface StationDoc {
  name: string;
  index: number;
  nextStations: NextStation[];
}

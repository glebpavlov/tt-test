/**
 * Trip class
 * odometerStart always starts with previous trip odometerEnd, no gap allowed
 */
export class Trip implements ITrip {
  /**
   * Date of trip
   */
  public date: Date;
  public odometerStart: number;
  public odometerEnd: number;
  public type: TripType;

  constructor(source?: ITrip) {
    Object.assign(this, source);
  }
}

export enum TripType {
  work = "work",
  personal = "personal"
}

export interface ITrip {
  // date of trip
  date?: Date;
  odometerStart?: number;
  odometerEnd?: number;
  type?: TripType;
}

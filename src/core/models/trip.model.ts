/**
 * Trip class
 * odometerStart always starts with previous trip odometerEnd, no gap allowed
 */
export class Trip implements ITrip {
  /**
   * Date of trip
   */
  public date: Date = new Date();
  public odometerStart: number = 0;
  public odometerEnd: number = 0;
  public type: TripType = TripType.Personal;

  constructor(source?: ITrip) {
    Object.assign(this, source);
  }
}

export enum TripType {
  Work = 'work',
  Personal = 'personal'
}

export interface ITrip {
  // date of trip
  date: Date;
  odometerStart: number;
  odometerEnd: number;
  type: TripType;
}

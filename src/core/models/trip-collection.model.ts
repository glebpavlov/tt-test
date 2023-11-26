import { ITrip, Trip, TripType } from "./trip.model";
import { calculatePercentage } from "../../common/utils/calculate-percentage";

export interface IDaysUsageTypeDistance {
  [k: string]: IUsageTypeDistance
}

export type IUsageTypeDistance = {
  [k in TripType]: number;
}

export interface IDaysTripTypePercentage {
  [k: string]: number;
}

export class TripCollection {

  public trips: Trip[];

  constructor(tripsData: ITrip[] = []) {
    this.trips = tripsData.map((data) => new Trip(data));
  }

  /**
   * Returns days with distance data for different types of trips
   * @return IDaysUsageTypeDistance
   */
  public getDaysUsageTypeDistance(): IDaysUsageTypeDistance {
    return this.trips.reduce(((tripsAccum, trip) => {
      // this day is not yet in the object
      if (!tripsAccum[+trip.date]) {
        // creating an object based on trip types in enum TripType
        tripsAccum[+trip.date] = Object.keys(TripType).reduce((tripTypeAccum, TripTypeKey)=>{
          // the starting value will be 0
          tripTypeAccum[TripType[TripTypeKey]] = 0;
          return tripTypeAccum;
        }, {});
      }
      // calculate the distance traveled and add it in the property with the current type of trip
      tripsAccum[+trip.date][trip.type] += (trip.odometerEnd - trip.odometerStart);
      return tripsAccum;
    }), {});
  }

  /**
   * returns the percentage of distance of the selected trip type by day
   * @param targetTypeTrip selected trip type from enum TripType. Default TripType.work
   */
  public getDaysTripTypePercentage(targetTypeTrip: TripType = TripType.work): IDaysTripTypePercentage {
    // get distances by day by type of trip
    const daysDistance = this.getDaysUsageTypeDistance();
    // array of trip days for further search
    const tripDays = Object.keys(daysDistance);
    return tripDays.reduce((accum, dayDate)=>{
      const dayTrip = daysDistance[dayDate];
      // sum up the entire distance for all types of trip
      const totalDistance = Object.keys(dayTrip).reduce((sum, type)=>(sum + dayTrip[type]), 0);
      // calculate the percentage of the selected trip type
      accum[dayDate] = calculatePercentage((dayTrip[targetTypeTrip] || 0), totalDistance);
      return accum;
    }, {});
  }




}

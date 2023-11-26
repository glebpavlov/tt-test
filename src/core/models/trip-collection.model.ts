import { ITrip, Trip, TripType } from "./trip.model";
import { calculatePercentage } from "../../common/utils/calculate-percentage";
import { averageNumber } from "../../common/utils/average-number";
import * as _ from "lodash";

export interface IDaysUsageTypeDistance {
  [k: string]: IUsageTypeDistance
}

export type IUsageTypeDistance = {
  [k in TripType]: number;
}

export interface IDaysTripTypePercentage {
  [k: string]: number;
}

export interface IAveragePercentage {
  period: number[],
  average: number;
}

export class TripCollection {
  private defaultDaysPeriod = 84;
  private defaultTripType = TripType.work;

  /**
   * trips of this collection
   */
  public trips: Trip[];

  constructor(tripsData: ITrip[] = []) {
    // creating trip instances
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
        tripsAccum[+trip.date] = Object.keys(TripType).reduce((tripTypeAccum, TripTypeKey) => {
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
   * @param targetTypeTrip selected trip type from enum TripType
   */
  public getDaysTripTypePercentage(targetTypeTrip: TripType = this.defaultTripType): IDaysTripTypePercentage {
    // get distances by day by type of trip
    const daysDistance: IDaysUsageTypeDistance = this.getDaysUsageTypeDistance();
    // array of trip days for further search
    const tripDays: string[] = Object.keys(daysDistance);
    // collect information as a percentage
    return tripDays.reduce((accum, dayDate) => {
      const dayTrip: IUsageTypeDistance = daysDistance[dayDate];
      // sum up the entire distance for all types of trip
      const totalDistance: number = Object.keys(dayTrip).reduce((sum: number, type: string) => (sum + dayTrip[type]), 0);
      // calculate the percentage of the selected trip type
      accum[dayDate] = calculatePercentage((dayTrip[targetTypeTrip] || 0), totalDistance);
      return accum;
    }, {});
  }

  /**
   * Returns arrays of travel dates separated by the selected date range.
   * @param periodAsDays number of days
   */
  public getPeriodsDaysTrip(periodAsDays: number = this.defaultDaysPeriod) {
    // for further calculation we need days in milliseconds
    const daysAsMilliseconds = periodAsDays * 24 * 60 * 60 * 1000;
    const periods = [];
    for (let startTripIndex = 0; startTripIndex < this.trips.length; startTripIndex++) {
      const startDate = +this.trips[startTripIndex].date
      const periodDays = new Set();
      // check the next trip days to see if they are within the selected range
      for (let endTripIndex = startTripIndex + 1; endTripIndex < this.trips.length; endTripIndex++) {
        const endDate = +this.trips[endTripIndex].date;
        //if the date differs by more than periodAsDays, then these days are out of range and we stop the search
        if (endDate - startDate > daysAsMilliseconds) {
          break;
        }
        periodDays.add(endDate);
        periods.push([...periodDays]);
      }
    }
    // remove duplicates
    return _.uniqWith(periods, _.isEqual).filter(v=>!!v.length);
  }

  /**
   * get average percentage of use of the selected trip type for the selected period
   * @param targetTypeTrip
   * @param periodDays
   */
  public getAveragePercentage(targetTypeTrip: TripType = this.defaultTripType, periodDays: number = this.defaultDaysPeriod): IAveragePercentage[] {
    const daysTripTypePercentage = this.getDaysTripTypePercentage(targetTypeTrip);
    const periodsDaysTrip = this.getPeriodsDaysTrip(periodDays);

    return periodsDaysTrip.map((period: number[]) => {
      return {period, average: averageNumber(period.map((day) => daysTripTypePercentage[day]))};
    });
  }


  /**
   * Returns data by period of the most used trip type as a percentage.
   * The percentage can be the same for different periods, so an array is returned
   * @param targetTypeTrip
   * @param periodDays
   * @param format
   */
  public getMaxTripTypePercentagePeriod(targetTypeTrip: TripType = this.defaultTripType, periodDays: number = this.defaultDaysPeriod, format: 'timestamp' | 'formatted' = "timestamp") {
    let averagePercentage: any = this.getAveragePercentage(targetTypeTrip, periodDays);
    if(format === "formatted"){
      // If a formatted view is required
      averagePercentage = averagePercentage.map(v=>({...v, period: v.period.map(time=>new Date(time).toISOString())}))
    }
    // calculate the maximum percentage
    const maxPercentage: number = Math.max.apply(null, averagePercentage.map((value) => value.average));
    // filter all periods when the usage percentage was less than the maximum found percentage
    return averagePercentage.filter((value) => value.average >= maxPercentage);
  }

}




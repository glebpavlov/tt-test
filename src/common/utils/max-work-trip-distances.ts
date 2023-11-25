import { Trip, TripType } from "../../core/models/trip.model";

export function maxWorkTripDistances(trips: Trip[]) {
  let workDistance = new Map();
  trips.forEach((trip) => {
    if (trip.type !== TripType.work) {
      return;
    }
    const dayKey = +trip.date;
    if (!workDistance.has(dayKey)) {
      workDistance.set(dayKey, 0);
    }
    workDistance.set(dayKey, workDistance.get(dayKey) + (trip.odometerEnd - trip.odometerStart));
  });
  workDistance = new Map([...workDistance].sort());
  const twelveWeeksMileSeconds = 7257600 * 1000 // 12 * 7 * 24 * 60 * 60;
  const distanceArray = [...workDistance];
  const periods = [];
  for (let startIndex = 0; startIndex < distanceArray.length; startIndex++) {
    const startDayDate = distanceArray[startIndex][0];
    const includedDays = [distanceArray[startIndex]];
    for (let endIndex = startIndex + 1; endIndex < distanceArray.length; endIndex++) {
      const endDayDate = distanceArray[endIndex][0];
      if ((endDayDate - startDayDate) <= twelveWeeksMileSeconds) {
        includedDays.push(distanceArray[endIndex]);
      }
    }
    periods.push(includedDays);
  }
  let tmpMaxDistance = 0;
  const maxDays = [];
  periods.forEach((period) => {
    const days = [];
    let distanceSum = 0;
    period.forEach(([day, distance]) => {
      days.push(day);
      distanceSum += distance;
    });
    if (tmpMaxDistance <= distanceSum) {
      tmpMaxDistance = distanceSum;
      maxDays.push(days)
    }
  });

  return maxDays;
}

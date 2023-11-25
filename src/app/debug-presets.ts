import { Trip, TripType } from "../core/models/trip.model";

export const tripPreset = [
  new Trip({
    date: new Date("2021-12-31T21:00:00.000Z"),
    odometerStart: 0,
    odometerEnd: 500,
    type: TripType.work
  }),

  new Trip({
    date: new Date("2022-01-01T21:00:00.000Z"),
    odometerStart: 500,
    odometerEnd: 1000,
    type: TripType.work
  }),

  new Trip({
    date: new Date("2022-04-01T21:00:00.000Z"),
    odometerStart: 1000,
    odometerEnd: 1002,
    type: TripType.work
  }),

  new Trip({
    date: new Date("2022-04-01T21:00:00.000Z"),
    odometerStart: 1002,
    odometerEnd: 1009,
    type: TripType.work
  }),

  new Trip({
    date: new Date("2022-07-01T21:00:00.000Z"),
    odometerStart: 1009,
    odometerEnd: 1122,
    type: TripType.work
  }),

  new Trip({
    date: new Date("2022-12-01T21:00:00.000Z"),
    odometerStart: 1122,
    odometerEnd: 1200,
    type: TripType.personal
  })

]

import { TripType } from "./trip.model";

export const oneDayData = [
  {
    date: new Date("2021-12-31T21:00:00.000Z"),
    odometerStart: 0,
    odometerEnd: 800,
    type: TripType.work
  },

  {
    date: new Date("2021-12-31T21:00:00.000Z"),
    odometerStart: 800,
    odometerEnd: 1000,
    type: TripType.personal
  }
]


export const thirteenWeeksData = [
  {
    date: new Date("2021-01-31T21:00:00.000Z"),
    odometerStart: 0,
    odometerEnd: 800,
    type: TripType.work
  },

  {
    date: new Date("2021-01-20T21:00:00.000Z"),
    odometerStart: 800,
    odometerEnd: 1000,
    type: TripType.personal
  },

  {
    date: new Date("2021-02-20T21:00:00.000Z"),
    odometerStart: 1000,
    odometerEnd: 1200,
    type: TripType.work
  },

  {
    date: new Date("2021-02-20T21:00:00.000Z"),
    odometerStart: 1200,
    odometerEnd: 4000,
    type: TripType.personal
  },

  {
    date: new Date("2021-02-20T21:00:00.000Z"),
    odometerStart: 4000,
    odometerEnd: 4001,
    type: TripType.work
  },

  {
    date: new Date("2021-03-20T21:00:00.000Z"),
    odometerStart: 4001,
    odometerEnd: 5000,
    type: TripType.work
  },

  {
    date: new Date("2021-04-20T21:00:00.000Z"),
    odometerStart: 5000,
    odometerEnd: 8000,
    type: TripType.personal
  },

  {
    date: new Date("2021-05-02T21:00:00Z"),
    odometerStart: 8000,
    odometerEnd: 8001,
    type: TripType.work
  },

  {
    date: new Date("2021-05-02T21:00:00Z"),
    odometerStart: 8001,
    odometerEnd: 8005,
    type: TripType.work
  },
  {
    date: new Date("2021-05-02T21:00:00Z"),
    odometerStart: 8005,
    odometerEnd: 8006,
    type: TripType.personal
  },

];
// "2021-05-02T21:00:00Z"

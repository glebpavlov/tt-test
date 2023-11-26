import { IDaysTripTypePercentage, IDaysUsageTypeDistance, TripCollection } from "./trip-collection.model";
import { oneDayData, thirteenWeeksData } from "./test-values.spec";
import { TripType } from "./trip.model";

describe('TripCollection Class', () => {
  const oneDayCollection = new TripCollection(oneDayData);
  const thirteenWeeksCollection = new TripCollection(thirteenWeeksData);
  it('should be an object with one day and a working distance of 800 km and a personal distance of 200 km', () => {
    const expectedData: IDaysUsageTypeDistance = {"1640984400000" : {[TripType.work]: 800, [TripType.personal]: 200}};
    const result = oneDayCollection.getDaysUsageTypeDistance();

    expect(result).toEqual(expectedData);
  });

  it('should be an object with one day 80% work usage', () => {
    const result = oneDayCollection.getDaysTripTypePercentage(TripType.work);
    const expectedData: IDaysTripTypePercentage = {"1640984400000": 80};

    expect(result).toEqual(expectedData);
  });

  it('should be an object with one day 20% personal usage', () => {
    const result = oneDayCollection.getDaysTripTypePercentage(TripType.personal);
    const expectedData: IDaysTripTypePercentage = {"1640984400000": 20};

    expect(result).toEqual(expectedData);
  });

  it('in 13 weeks there should be 38 trip periods', () => {
    const result = thirteenWeeksCollection.getPeriodsDaysTrip(84);
    const expectedLength: number = 38;

    expect(result.length).toBe(expectedLength);
  });
});

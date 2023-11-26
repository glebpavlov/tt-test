import { IDaysTripTypePercentage, IDaysUsageTypeDistance, TripCollection } from "./trip-collection.model";
import { oneDayData, thirteenWeeksData } from "./test-values.spec";
import { TripType } from "./trip.model";

describe('TripCollection Class', () => {
  const oneDayCollection = new TripCollection(oneDayData);
  const thirteenWeeksCollection = new TripCollection(thirteenWeeksData);
  it('should be an object with one day and a working distance of 800 km and a personal distance of 200 km with oneDayCollection', () => {
    const expectedData: IDaysUsageTypeDistance = {"1640984400000" : {[TripType.work]: 800, [TripType.personal]: 200}};
    const result = oneDayCollection.getDaysUsageTypeDistance();

    expect(result).toEqual(expectedData);
  });

  it('should be an object with one day 80% work usage with oneDayCollection', () => {
    const result = oneDayCollection.getDaysTripTypePercentage(TripType.work);
    const expectedData: IDaysTripTypePercentage = {"1640984400000": 80};

    expect(result).toEqual(expectedData);
  });

  it('should be an object with one day 20% personal usage with oneDayCollection', () => {
    const result = oneDayCollection.getDaysTripTypePercentage(TripType.personal);
    const expectedData: IDaysTripTypePercentage = {"1640984400000": 20};

    expect(result).toEqual(expectedData);
  });

  it('in 13 weeks there should be 14 trip periods with thirteenWeeksCollection', () => {
    const result = thirteenWeeksCollection.getPeriodsDaysTrip(84);
    const expectedLength: number = 14;

    expect(result.length).toBe(expectedLength);
  });

  it('should be 1 object in the array with average 80 with oneDayCollection', () => {
    const result = oneDayCollection.getAveragePercentage(TripType.work, 84);

    expect(result.length).toBe(1);
    expect(result[0].average).toBe(80);
  });


  it('should be 2 periods of maximum operating use', () => {
    const result = thirteenWeeksCollection.getMaxTripTypePercentagePeriod(TripType.work, 84, "formatted");

    expect(result.length).toBe(2);
  });


});

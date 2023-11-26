import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { tuiArrayRemove } from "@taiga-ui/cdk";
import { Trip, TripType } from "../core/models/trip.model";
import { oneDayData } from "../core/models/test-values.spec";
import { maxWorkTripDistances } from "../common/utils/max-work-trip-distances";
import { randomColor } from "../common/utils/random-color";

@Component({
  selector: 'tt-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public trips: Trip[] = [];

  public twelveWeekMaxDistanceDays = [];
  private distanceColors = [];

  public add(): void {
    this.trips = this.trips.concat(new Trip());
  }

  public remove(index: number): void {
    this.trips = tuiArrayRemove(this.trips, index);
  }

  public save(index: number, trip: Trip): void {
    this.trips[index] = trip;
  }

  public tripTrackBy(index, _trip) {
    return `${index}_${this.trips?.length}`;
  }

  public loadDemoData() {
    this.trips = oneDayData;
  }

  public getColor(trip: Trip){
    if(trip.type !== TripType.work){
      return;
    }
    for(let periodIndex = 0; periodIndex < this.twelveWeekMaxDistanceDays.length; periodIndex++){
      const period = this.twelveWeekMaxDistanceDays[periodIndex]
      for(let date of period){
        if(+trip.date === +date){
          return this.distanceColors[periodIndex]
        }
      }
    }
  }

  public calculate() {
    this.twelveWeekMaxDistanceDays = maxWorkTripDistances(this.trips);
    this.distanceColors = this.twelveWeekMaxDistanceDays.map(()=>randomColor());
  }

}

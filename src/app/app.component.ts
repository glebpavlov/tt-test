import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { tuiArrayRemove } from "@taiga-ui/cdk";
import { Trip } from "../core/models/trip.model";

@Component({
  selector: 'tt-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public trips: Trip[] = [];

  public add(): void {
    this.trips = this.trips.concat(new Trip());
  }

  public remove(index: number): void {
    this.trips = tuiArrayRemove(this.trips, index);
  }

  public save(index: number, trip: Trip): void {
    console.log(trip)
    this.trips[index] = trip;
  }

}

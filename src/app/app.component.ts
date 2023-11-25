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

  add(): void {
    this.trips = this.trips.concat(new Trip());

  }

  remove(index: number): void {
    this.trips = tuiArrayRemove(this.trips, index);
  }
}

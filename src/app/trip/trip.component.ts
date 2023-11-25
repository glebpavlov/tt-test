import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { Trip } from "../../core/models/trip.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TuiDay } from "@taiga-ui/cdk";

@Component({
  selector: 'tt-test-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripComponent implements OnChanges {
  @Input()
  public trip: Trip;

  public expanded = true;

  @Output()
  public remove = new EventEmitter<undefined>()

  public form: FormGroup;

  private initForm() {
    this.form = this.formBuilder.group({
      date: [TuiDay.fromLocalNativeDate(this.trip.date), [Validators.required]],
      odometerStart: [this.trip.odometerStart, [Validators.required, Validators.min(0)]],
      odometerEnd: [this.trip.odometerEnd, [Validators.required, Validators.min(0)]],
      type: [this.trip.type, [Validators.required]]
    });
  }

  public get dateOfTrip(): Date {
    return this.form?.get('date')?.value?.toLocalNativeDate() || this.trip.date;
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.initForm();
  }

}

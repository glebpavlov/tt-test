import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITrip, Trip, TripType } from "../../core/models/trip.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AutoUnsubscribe } from "../../common/decorators/auto-unsubscribe.decorator";
import { debounceTime, filter, map, Subscription, tap } from "rxjs";
import { TuiDay } from "@taiga-ui/cdk";

interface ITripFormValues extends Partial<Omit<ITrip, "date">> {
  date?: TuiDay;
}

@Component({
  selector: 'tt-test-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@AutoUnsubscribe(['formChangeSubscription'])
export class TripComponent implements OnInit {

  private _trip: Trip;
  @Input()
  public set trip(value: Trip) {
    // preventing mutation
    this._trip = {...value};
  }

  public get trip(): Trip {
    return this._trip;
  }

  public expanded = true;

  @Output()
  public remove = new EventEmitter<undefined>();

  @Output()
  public save = new EventEmitter<Trip>();

  public form: FormGroup;

  public tripTypes = Object.keys(TripType);

  /**
   * Form save subscription
   * @private
   */
  private formChangeSubscription: Subscription;

  private initForm() {
    this.form = this.formBuilder.group({
      date: [this.trip?.date ? TuiDay.fromLocalNativeDate(this.trip?.date) : null, [Validators.required]],
      odometerStart: [this.trip?.odometerStart, [Validators.required, Validators.min(0)]],
      odometerEnd: [this.trip?.odometerEnd, [Validators.required, Validators.min(0)]],
      type: [this.trip?.type, [Validators.required]]
    });

    this.formChangeSubscription = this.form.valueChanges
      .pipe(
        // filtering invalid form data
        filter(() => this.form.valid),
        // cleaning up flood triggers
        debounceTime(500),
        // preventing mutation
        map((formValues: ITripFormValues): ITripFormValues => ({...formValues})),
        // converting TuiDay to native date
        map((formValues: ITripFormValues): ITrip => formValues.date ? {
          ...formValues,
          date: formValues.date.toLocalNativeDate()
        } : formValues as unknown as ITrip),
        // creating a new instance
        map((values: ITrip) => (new Trip(values))),
        // let's emit the trip outside
        tap((trip: Trip) => this.save.emit(trip))
      )
      .subscribe();
  }

  public get dateOfTrip(): Date {
    return this.form?.get('date')?.value?.toLocalNativeDate?.() || this.trip?.date || undefined;
  }

  constructor(private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.initForm();
  }

}

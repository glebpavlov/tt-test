import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiButtonModule,
  TuiExpandModule,
  TuiTextfieldControllerModule, TuiHintModule, TuiFormatDatePipeModule
} from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TripComponent } from './trip/trip.component';
import { TuiElasticContainerModule, TuiInputDateModule, TuiInputModule, TuiInputNumberModule } from "@taiga-ui/kit";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TripComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiElasticContainerModule,
    TuiButtonModule,
    TuiExpandModule,
    TuiInputModule,
    FormsModule,
    TuiInputDateModule,
    TuiTextfieldControllerModule,
    TuiInputNumberModule,
    TuiHintModule,
    TuiFormatDatePipeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

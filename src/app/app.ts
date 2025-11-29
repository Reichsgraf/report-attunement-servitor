import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule,
} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import { Clipboard } from '@angular/cdk/clipboard';
import {formatDate} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButton,
    MatTimepickerModule,
    MatAutocompleteModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'uk-UA' }
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App implements OnInit {
  protected formGroup: FormGroup;
  protected uavOptions = ['AS 3', 'Grey Widow', 'Sting', 'VB140 Блискавка', 'F7 LITAVR', 'БАГНЕТ-АА', 'P1SUN'].sort()

  constructor(
    private clipboard: Clipboard,
    @Inject(LOCALE_ID) private locale: string
  ) {
    const currentDate: Date = new Date();

    this.formGroup = new FormGroup({
      crewName: new FormControl(''),
      uav: new FormControl(''),
      targetNumber: new FormControl(''),
      startLocation: new FormControl(''),
      startDate: new FormControl(currentDate),
      endLocation: new FormControl(''),
      endDate: new FormControl(currentDate),
      result: new FormControl(''),
    });
  }

  ngOnInit() {

  }

  setCurrentTime(controlName: string) {
    const currentDate: Date = new Date();
    this.formGroup.get(controlName)?.setValue(currentDate);
  }

  startFlight() {
    const startDateTime = this.formatDateTime("startDate")
    this.clipboard.copy(
      `Тип: БпЛА літакового типу\n` +
      `Екіпаж: ${this.formGroup.get("crewName")?.value}\n` +
      `Коментар: ${this.formGroup.get("targetNumber")?.value}\n` +
      `Час: ${startDateTime}\n` +
      `${this.formGroup.get("uav")?.value}\n` +
      `${this.formGroup.get("startLocation")?.value}`
    );
  }

  endFlight() {
    const starDateTime = this.formatDateTime("startDate")
    const endDateTime = this.formatDateTime("endDate")
    this.clipboard.copy(
      `Тип: БпЛА літакового типу\n` +
      `Екіпаж: ${this.formGroup.get("crewName")?.value}\n` +
      `Коментар: ${this.formGroup.get("targetNumber")?.value}\n` +
      `Час: ${starDateTime}\n` +
      `Час: ${endDateTime}\n` +
      `${this.formGroup.get("uav")?.value}\n` +
      `${this.formGroup.get("startLocation")?.value}\n` +
      `${this.formGroup.get("result")?.value}\n` +
      `${this.formGroup.get("endLocation")?.value}`
    );
  }

  formatDateTime(dateControlName: string) {
    const dateTime = new Date(this.formGroup.get(dateControlName)?.value)
    return formatDate(dateTime, "dd.MM.yyyy HH:mm", this.locale)
  }
}

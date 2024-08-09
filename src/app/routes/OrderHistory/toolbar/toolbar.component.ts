import { Component, Inject, ChangeDetectionStrategy } from "@angular/core";
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { Output, EventEmitter } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DATE_LOCALE } from "@angular/material/core";

import {
  MatDatepickerModule,
  MatDatepickerInputEvent,
} from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { provideNativeDateAdapter } from "@angular/material/core";

type StatusFilter = "pending" | "inProgress" | "completed";
@Component({
  selector: "toolbar",
  templateUrl: "toolbar.component.html",
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: "en-UK" },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./toolbar.component.less",
})
export class ToolbarComponent {
  today = new Date();
  previous31days = 31 * 24 * 60 * 60 * 1000;
  startDate = new FormControl(
    new Date(this.today.getTime() - this.previous31days),
  );
  endDate = new FormControl(this.today);

  dateChangeEvent(type: "start" | "end", event: MatDatepickerInputEvent<Date>) {
    console.log("---", type, event.value);
  }

  statusFilters: StatusFilter[] = [];
  selectedProductLine = "";

  statusFilter(status: StatusFilter) {
    if (!this.statusFilters.indexOf(status)) {
      this.statusFilters = this.statusFilters.filter((item) => item !== status);
    } else {
      this.statusFilters = [...this.statusFilters, status];
    }
  }

  productLineFilter() {
    console.log("change - ", this.selectedProductLine);
  }

  @Output() orderNumberFilterEvent = new EventEmitter<string>();

  filterByOrderNumber(e: Event) {
    const input = e.target as HTMLInputElement;
    this.orderNumberFilterEvent.emit(input.value);
  }
}

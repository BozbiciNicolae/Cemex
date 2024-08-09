import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
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

type StatusFilter = "pending" | "in progress" | "completed";

interface Filters {
  status: StatusFilter[];
  date: {
    start: number;
    end: number;
  };
  productLine: string;
  search: string;
}

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
export class ToolbarComponent implements OnInit {
  today = new Date();
  previous31days = 31 * 24 * 60 * 60 * 1000;
  startDate = new FormControl(
    new Date(this.today.getTime() - this.previous31days),
  );
  endDate = new FormControl(this.today);

  filters: Filters = {
    status: [],
    date: {
      start: this.today.getTime() - this.previous31days,
      end: this.today.getTime(),
    },
    productLine: "",
    search: "",
  };

  ngOnInit(): void {
    this.updateFilters();
  }

  dateChangeEvent(type: "start" | "end", event: MatDatepickerInputEvent<Date>) {
    this.filters = {
      ...this.filters,
      date: {
        ...this.filters.date,
        [type]: event.value && new Date(event.value).getTime(),
      },
    };
    this.updateFilters();
  }

  statusFilters: StatusFilter[] = [];

  statusFilterChange(status: StatusFilter) {
    if (this.statusFilters.indexOf(status) != -1) {
      this.statusFilters = this.statusFilters.filter((item) => item !== status);
    } else {
      this.statusFilters = [...this.statusFilters, status];
    }

    this.filters = {
      ...this.filters,
      status: this.statusFilters,
    };
    this.updateFilters();
  }

  productLineFilterChange(value: string) {
    this.filters = {
      ...this.filters,
      productLine: value,
    };
    this.updateFilters();
  }

  searchTextChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.filters = {
      ...this.filters,
      search: input.value,
    };
    this.updateFilters();
  }

  @Output() updateFiltersEvent = new EventEmitter<Filters>();
  updateFilters() {
    this.updateFiltersEvent.emit(this.filters);
  }
}

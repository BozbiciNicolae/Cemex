import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.component.html',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  styleUrl: './toolbar.component.less'
})

export class ToolbarComponent {
  @Output() orderNumberFilterEvent = new EventEmitter<string>();

  filterByOrderNumber(e: Event) {
    const input = e.target as HTMLInputElement;
    this.orderNumberFilterEvent.emit(input.value)
  }
}
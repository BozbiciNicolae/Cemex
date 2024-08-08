import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Order from '../../../types/order';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'orders',
  templateUrl: 'orders.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  styleUrl: 'orders.component.less'
})

export class OrdersComponent {
  @Input() items: Order[] = [];

  displayedColumns: string[] = ['status', 'orderNumber', 'productLine', 'productName', 'quantity', 'createdAt'];
}
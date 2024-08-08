import { Component, inject } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { OrdersComponent } from './orders/orders.component';
import Order from '../../types/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'order-history',
  templateUrl: 'orderHistory.component.html',
  styleUrl: 'orderHistory.component.less',
  standalone: true,
  imports: [ToolbarComponent, OrdersComponent]
})

export default class OrderHistoryComponent {  
  ordersService: OrdersService = inject(OrdersService)
  orderList: Order[] = [];
  filteredOrderList: Order[] = [];

  constructor() {
    this.ordersService.getAllOrders().then((orders: Order[]) => {
      this.orderList = orders;
      this.filteredOrderList = orders;
    });
  }

  filterByOrderNumber(text: string) {
    this.filteredOrderList = this.orderList.filter((item: Order) => item.orderNumber.toString().includes(text))
  }
}
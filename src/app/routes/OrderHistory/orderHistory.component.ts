import { Component, inject } from "@angular/core";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { OrdersComponent } from "./orders/orders.component";
import Order from "../../types/order";
import { OrdersService } from "../../services/orders.service";
import { CommonModule } from "@angular/common";
import { EmptyStateComponent } from "../../components/EmptyState/emptyState.component";

@Component({
  selector: "order-history",
  templateUrl: "orderHistory.component.html",
  styleUrl: "orderHistory.component.less",
  standalone: true,
  imports: [
    EmptyStateComponent,
    ToolbarComponent,
    OrdersComponent,
    CommonModule,
  ],
})
export default class OrderHistoryComponent {
  ordersService: OrdersService = inject(OrdersService);
  orderList: Order[] = [];
  filteredOrderList: Order[] = [];

  constructor() {
    this.ordersService.getAllOrders().then((orders: Order[]) => {
      this.orderList = orders;
      this.filteredOrderList = orders;
    });
  }

  filterByOrderNumber(text: string) {
    this.filteredOrderList = this.orderList.filter((item: Order) =>
      item.orderNumber.toString().includes(text),
    );
  }

  runFilters(filters: any) {
    this.filteredOrderList = this.orderList
      .filter((item: Order) =>
        item.orderNumber.toString().includes(filters.search),
      )
      .filter((item: Order) =>
        filters.productLine
          ? item.productLine.toLowerCase() === filters.productLine.toLowerCase()
          : item,
      )
      .filter((item: Order) => {
        return filters.status.length
          ? filters.status.indexOf(item.status.toLowerCase()) !== -1
          : item;
      })
      .filter((item: Order) => {
        const itemDate = new Date(item.createdAt).getTime();
        return (
          filters.date.start < itemDate && filters.date.end > itemDate && item
        );
      });
  }
}

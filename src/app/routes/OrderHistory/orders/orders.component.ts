import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import Order from "../../../types/order";
import { MatTableModule } from "@angular/material/table";
import { ColorByStatusDirective } from "../../../directives/ColorByStatus.directive";

@Component({
  selector: "orders",
  templateUrl: "orders.component.html",
  standalone: true,
  imports: [CommonModule, MatTableModule, ColorByStatusDirective],
  styleUrl: "orders.component.less",
})
export class OrdersComponent {
  @Input() items: Order[] = [];

  displayedColumns: string[] = [
    "status",
    "orderNumber",
    "productLine",
    "productName",
    "quantity",
    "createdAt",
  ];
}

import { Injectable } from "@angular/core";
import Order from "../types/order";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  protected orders: Order[] = [];
  url = 'http://localhost:3000/orders';

  constructor(){}

  async getAllOrders(): Promise<Order[]> {
    const data = await fetch(this.url);
    return await data.json();
  }
}
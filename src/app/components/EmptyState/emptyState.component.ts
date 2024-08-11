import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "empty-state",
  templateUrl: "emptyState.component.html",
  styleUrl: "emptyState.component.less",
  standalone: true,
  imports: [MatIconModule],
})
export class EmptyStateComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

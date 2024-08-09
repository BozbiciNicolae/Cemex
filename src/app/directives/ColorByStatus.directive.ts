import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Directive({
  selector: "[colorByStatus]",
  standalone: true,
})
export class ColorByStatusDirective implements OnChanges {
  statusColors: any = {
    Completed: "#79c944",
    "In Progress": "#3fa9f5",
    Pending: "#fbb03c",
  };
  @Input("colorByStatus") status: string = "";
  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.el?.nativeElement) {
      this.el.nativeElement.style.background =
        this.statusColors[changes["status"].currentValue];
    }
  }
}

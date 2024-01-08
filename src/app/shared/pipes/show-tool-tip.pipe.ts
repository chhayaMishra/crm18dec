import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "showtooltip",
})
export class ShowToolTipPipe implements PipeTransform {
  transform(value: any, limit: number): string {
    if (!value) return "";
    if (value.length > limit) {
      return value;
    } else {
      return "";
    }
  }
}

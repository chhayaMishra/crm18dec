import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "wordslimit",
})
export class WordsLimitPipe implements PipeTransform {
  transform(value: any, limit: number): string {
    if (!value) return "";
    if (value.length > limit) {
      return value.slice("", limit) + "...";
    } else {
      return value;
    }
  }
}

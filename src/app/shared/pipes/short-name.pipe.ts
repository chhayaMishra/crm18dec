import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shortName",
})
export class ShortNamePipe implements PipeTransform {
  transform(name: string): any {
    if (name) {
      let split = name.split(" ");
      return name.split(" ").map((n, i) => {
        if (i == 0 || i == split.length - 1) {
          return n[0];
        }
      })
        .join("");
    } else {
      return
     }
  }
}

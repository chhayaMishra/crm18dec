import { NgModule } from "@angular/core";
import { TrimAndPreventFirstSpaceDirective } from "./trimAndPreventFirstSpace.directive";
import { NumberValidationDirective } from "./number-validation.directive";

@NgModule({
  imports: [],
  declarations: [TrimAndPreventFirstSpaceDirective, NumberValidationDirective],
  exports: [TrimAndPreventFirstSpaceDirective, NumberValidationDirective],
})
export class DirectivesModule {}

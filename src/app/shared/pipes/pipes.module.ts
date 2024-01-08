import { NgModule } from "@angular/core";
import { ShortNamePipe } from "./short-name.pipe";
import { WordsLimitPipe } from "./words-limit.pipe";
import { ShowToolTipPipe } from "./show-tool-tip.pipe";
import { IndianNumberFormatPipe } from './indian-number-format.pipe';
@NgModule({
  imports: [],
  declarations: [ShortNamePipe, WordsLimitPipe, ShowToolTipPipe, IndianNumberFormatPipe],
  exports: [ShortNamePipe, WordsLimitPipe, ShowToolTipPipe, IndianNumberFormatPipe],
})
export class PipesModule { }

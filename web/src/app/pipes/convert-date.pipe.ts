import {Pipe, PipeTransform} from "@angular/core";
import {DatePipe} from "@angular/common";

@Pipe({
  name:'convertDateType'
})
export class ConvertDateTypePipe implements PipeTransform{
  transform(value: Date): string {
    const datePipe = new DatePipe('en-US');

    const formattedDate = datePipe.transform(value, 'MMM d, yyyy');
    return formattedDate ? formattedDate : '';
  }

}

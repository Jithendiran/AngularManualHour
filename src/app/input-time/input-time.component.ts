import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.css']
})
export class InputTimeComponent implements OnChanges {
  @Input() time:String = ''
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
      console.log("changes : ",changes);
      
  }


}

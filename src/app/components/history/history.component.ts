import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-history',
  /*template: `<div class="history_item">
    <div class="history_image">
    <img src='{{item1}}'><img src='{{item2}}'><img src='{{item3}}'><img src='{{item4}}'>
</div>
<div>
  <p>{{answers}}</p>
</div>
</div>`,*/
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  @Input() item1: String;
  @Input() item2: String;
  @Input() item3: String;
  @Input() item4: String;
  @Input() answer1: String;
  @Input() answer2: String;
  @Input() answer3: String;
  @Input() attempt: number;
}

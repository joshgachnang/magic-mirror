import {Component} from "angular2/core";
import {PadPipe} from "./pad.pipe";

@Component(
    {
      selector: 'clock',
      template: `
<div layout="column" layout-sm="column" class="top left">
  <span class="time row">
    <span class="hours">{{ date.getHours() | pad}}</span>:
    <span class="minutes">{{ date.getMinutes() | pad}}</span>
    <span class="ampm">{{ ampm }}</span>
  </span>
  <span class="date row">
    <p>
      {{ days[date.getDay()]}}
      the {{ date.getDate() }}
      of {{ months[date.getMonth()]}}.
    </p>
  </span>
</div>`,
      styles: [`
    `],
      directives: [],
      pipes: [PadPipe]
    })

export class ClockComponent {
  date:Date;
  days:Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  months:Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() {
    this.date = new Date();
  }
}

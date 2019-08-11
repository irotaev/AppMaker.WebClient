import {Component} from '@angular/core';

@Component({
  selector: 'apm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AppMaker';

  isComponentListDisplayed = true;
  isPropertyListDisplayed = false;
}

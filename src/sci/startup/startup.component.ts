import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sci-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {

  constructor() {
  }

  async ngOnInit() {

    const src = '/assets/module.js';

    import(/* webpackIgnore: true */src).then(m => {
      console.log(m);
    });
  }

}

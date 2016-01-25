import {Component, OnInit} from 'angular2/core';
//import {UberService} from './uber.service';

import {Http, HTTP_PROVIDERS} from 'angular2/http';

@Component({
  selector: 'uber',
  viewProviders: [HTTP_PROVIDERS],
  template: '<p>uber estimate: {{estimate}} minutes.</p>'
})
export class UberEstimateComponent {

  constructor(http: Http) {
    console.log(http);
    //http.get('https://api.uber.com/v1/estimates/time')
    http.get('people.json')
      // Call map on the response observable to get the parsed people object
      .map(res => res.json())
      // Subscribe to the observable to get the parsed people object and attach it to the
      // component
      .subscribe(estimate => this.estimate = estimate);
  }
}

//@Component({
//  selector: 'uber',
//  providers: [UberService],
//  template: `<p>uber estimate: {{estimate}} minutes.</p>`,
//})
//export class UberEstimateComponent {
//  constructor(uberService:UberService) {
//    UberService.estimate.subscribe(
//        estimate => this.estmiate = estimate,
//        console.error(),
//        () => console.log('Completed!')
//    );
//  }
//}

import {bootstrap}    from 'angular2/platform/browser'
import {ClockComponent} from './clock.component';
import {UberEstimateComponent} from './uber.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
//import {UberService} from './uber.service'


bootstrap(ClockComponent)
  .catch(err => console.error(err));
bootstrap(UberEstimateComponent, [HTTP_PROVIDERS])
  .catch(err => console.error(err));


import {Injectable} from "angular2/core";
import {Http} from "angular2/http";

@Injectable()
export class UberService {
  public estimate;

  constructor(public http:Http) {
  }

  getEstimate() {
    this.estimate = http.get('https://api.uber.com/v1/estimates/time')
        .map(response => response.json())
        .map(estimate => response)
  }
}

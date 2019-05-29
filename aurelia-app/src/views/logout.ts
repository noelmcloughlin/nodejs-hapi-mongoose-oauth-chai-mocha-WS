import { inject } from 'aurelia-framework';
import { PoiService } from '../services/poi-service';

@inject(PoiService)
export class Logout {
  constructor(private ds: PoiService) {}

  attached() {
    this.ds.logout();
  }
}

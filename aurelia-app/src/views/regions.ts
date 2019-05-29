import { inject } from 'aurelia-framework';
import { Region } from '../services/poi-types';
import { PoiService } from '../services/poi-service';

@inject(PoiService)
export class Regions {
  regions: Region[];

  constructor(private ds: PoiService) {
    this.regions = ds.regions;
  }
}


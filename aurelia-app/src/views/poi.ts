import { inject } from 'aurelia-framework';
import { Region, Poi } from '../services/poi-types';
import { PoiService } from '../services/poi-service';

@inject(PoiService)
export class Pois {
  pois: Poi[];
  regions: Region[];
  total = 0;

  constructor(private ds: PoiService) {
    this.regions = ds.regions;
    this.pois = ds.pois;
    this.total = ds.total;
  }
}


import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Region, Poi } from '../../services/poi-types';
import {PoiService} from "../../services/poi-service";

@inject(PoiService)
export class PoiForm {
  @bindable
  regions: Region[];

  nameHtml = '';
  safeName = '';
  selectedRegion : Region = null;

  constructor (private ds: PoiService) {}

  makePoi() {
    this.ds.poi(this.nameHtml, this.safeName, this.selectedRegion);
  }
}

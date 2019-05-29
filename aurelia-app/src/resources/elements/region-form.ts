import { bindable } from 'aurelia-framework';
import { Region } from '../../services/poi-types';

export class RegionForm {
  title: string;
  variable: string;
  identifier: string;
  geo: {
    lat: Number;
    long: Number;
  };
  @bindable
  regions: Region[];

  addRegion() {
    const region = {
      title: this.title,
      variable: this.variable,
      identifier: this.identifier,
      geo: this.geo
    };
    this.regions.push(region);
    console.log(region);
  }
}

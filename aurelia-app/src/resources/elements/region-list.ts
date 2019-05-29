import { bindable } from 'aurelia-framework';
import { Region } from '../../services/poi-types';

export class RegionList {
  @bindable
  regions: Region[];
}

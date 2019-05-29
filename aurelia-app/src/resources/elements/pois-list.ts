import { bindable } from 'aurelia-framework';
import {Poi} from "../../services/poi-types";

export class PoisList {
  @bindable
  pois : Poi[];
}

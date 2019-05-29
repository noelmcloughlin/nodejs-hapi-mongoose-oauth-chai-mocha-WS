import { inject } from 'aurelia-framework';
import { PoiService } from '../../services/poi-service';
import { bindable } from 'aurelia-framework';
import { TotalPoi } from '../../services/messages';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(PoiService, EventAggregator)
export class TotalPois {
  total = 0;

  constructor(private ds: PoiService, private ea: EventAggregator) {
    this.total = ds.total;
    ea.subscribe(TotalPoi, msg => {
      this.total = msg.total;
    });
  }
}

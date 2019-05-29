import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Region, Poi } from './poi-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { TotalPoi } from './messages';

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class PoiService {
  regions: Region[] = [];
  pois: Poi[] = [];
  total = 0;

  constructor(
    private httpClient: HttpClient,
    private ea: EventAggregator,
    private au: Aurelia,
    private router: Router
  ) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:8000');
    });
  }

  async getRegions() {
    const response = await this.httpClient.get('/api/region');
    this.regions = await response.content;
    console.log(this.regions);
  }

  async createRegion(firstName: string, lastName: string, office: string) {
    const region = {
      firstName: firstName,
      lastName: lastName,
      office: office
    };
    const response = await this.httpClient.post('/api/region', region);
    const newRegion = await response.content;
    this.regions.push(newRegion);
  }

  async poi(nameHtml: string, safeName: string, costalZone: Region) {
    const poi = {
      nameHtml: nameHtml,
      safeName: safeName,
      costalZone: costalZone,
      coordinates: null,
      cursor: 0,
      description: ''
    };
    this.pois.push(poi);
    this.total = this.total + 1;
    this.ea.publish(new TotalPoi(this.total));
    console.log('Total so far ' + this.total);
  }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    const response = await this.httpClient.post('/api/user', user);
    const newUser = await response.content;
    this.changeRouter(PLATFORM.moduleName('app'));
    return false;
  }

  async login(email: string, password: string) {
    const response = await this.httpClient.post('/api/user/authenticate', {
      email: email,
      password: password
    });
    const status = await response.content;
    if (status.success) {
      this.httpClient.configure(configuration => {
        configuration.withHeader('Authorization', 'bearer ' + status.token);
      });
      localStorage.poi = JSON.stringify(response.content);
      await this.getRegions();
      this.changeRouter(PLATFORM.moduleName('app'));
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.poi = null;
    this.httpClient.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
    this.changeRouter(PLATFORM.moduleName('start'));
  }

  checkIsAuthenticated() {
    let authenticated = false;
    if (localStorage.poi !== 'null') {
      authenticated = true;
      this.httpClient.configure(http => {
        const auth = JSON.parse(localStorage.poi);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
      this.changeRouter(PLATFORM.moduleName('app'));
    }
  }

  changeRouter(module: string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }
}

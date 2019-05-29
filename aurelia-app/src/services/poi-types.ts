export interface Region {
  title: String,
  variable: String,
  identifier: String,
  geo: {
    lat: Number,
    long: Number
  },
}

export interface Poi {
  nameHtml: String;
  safeName: String;
  coordinates: {
    irishGrid: {
      sheet: String;
        eastings: String;
        northings: String;
    },
    fullIrishGrid: {
      sheet: String;
        eastings: String;
        northings: String;
    },
    tmcGrid: {
      sheet: String;
        eastings: String;
        northings: String;
    },
    geo: {
      lat: Number;
      long: Number;
    }
  },
  cursor: Number;
  description: String;
  costalZone: Region;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
}

export type State = {
  schedule: Schedule;
  drivers: any[];
};

export type Schedule = Round[];

export type Round = {
  Circuit: {
    Location: {
      country: string;
      lat: string;
      locality: string;
      long: string;
    };
    circuitId: string;
    circuitName: string;
    url: string;
  };
  countryFlag: string;
  FirstPractice: {
    date: string;
    time: string;
  };
  Qualifying: {
    date: string;
    time: string;
  };
  SecondPractice: {
    date: string;
    time: string;
  };
  Sprint?: {
    date: string;
    time: string;
  };
  date: string;
  raceName: string;
  round: string;
  season: string;
  time: string;
  url: string;
};

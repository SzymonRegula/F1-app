import { API_F1_URL, API_SPORTS_KEY, API_SPORTS_URL } from './config.js';
import { State } from './types/types.js';

export const state: State = {
  schedule: [],
  drivers: [],
};

export async function getScheduleData() {
  try {
    // render spinner needed
    const response = await fetch(`${API_F1_URL}current.json`);
    const data = await response.json();
    console.log(data.MRData.RaceTable.Races);
    state.schedule = data.MRData.RaceTable.Races;

    const flagPromises: Promise<string>[] = [];
    state.schedule.forEach((round) => {
      flagPromises.push(getFlag(round.Circuit.Location.country));
    });
    await Promise.all(flagPromises).then((flags) => {
      state.schedule.forEach((round, i) => {
        round.countryFlag = flags[i];
      });
    });

    console.log(state.schedule);
  } catch (err) {
    console.error(err);
  }
}

export async function getDriversData() {
  try {
    const response = await fetch(`${API_F1_URL}current/drivers.json`);
    const data = await response.json();
    state.drivers = data.MRData.DriverTable.Drivers;
    console.log('drivers', state.drivers);
  } catch (err) {
    console.error(err);
  }
}

export async function getFlag(country: string) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}?fields=flags`
    );
    const data = await response.json();
    const flagImg = data[0].flags.svg;
    return flagImg;
  } catch (err) {
    console.error(err);
  }
}

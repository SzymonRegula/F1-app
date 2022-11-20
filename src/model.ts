import { API_F1_URL, API_SPORTS_KEY, API_SPORTS_URL } from './config.js';
import { State } from './types/types.js';

export const state: State = {
  season: `${new Date().getFullYear()}`,
  currentSchedule: [],
  schedules: [],
  drivers: [],
};

export function changeSeason(year: string) {
  state.season = year;
}

export async function getScheduleData(season: string) {
  try {
    const response = await fetch(`${API_F1_URL}${season}.json`);
    const data = await response.json();
    console.log(data);
    state.currentSchedule = data.MRData.RaceTable.Races;
    console.log(state.currentSchedule);

    const flagPromises: Promise<string>[] = [];
    state.currentSchedule.forEach((round) => {
      flagPromises.push(getFlag(round.Circuit.Location.country));
    });
    await Promise.all(flagPromises).then((flags) => {
      state.currentSchedule.forEach((round, i) => {
        round.countryFlag = flags[i];
      });
    });

    console.log(state.currentSchedule);
  } catch (err) {
    console.error(err);
  }
}

export async function getDriversData(season: string) {
  try {
    const response = await fetch(`${API_F1_URL}${season}/drivers.json`);
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

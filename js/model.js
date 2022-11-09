import { API_F1_URL, API_SPORTS_KEY, API_SPORTS_URL } from './config';

export const state = {
  schedule: [],
  drivers: [],
};

// const myHeaders = new Headers();
// myHeaders.append('x-rapidapi-key', API_SPORTS_KEY);
// myHeaders.append('x-rapidapi-host', 'v1.formula-1.api-sports.io');
// const requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow',
// };

// async function getCityId(city) {
//   try {
//     const responseId = await fetch(
//       `${API_SPORTS_URL}competitions?city=${city}`,
//       requestOptions
//     );
//     const dataId = await responseId.json();
//     const [competition] = dataId.response;
//     console.log(dataId, competition);
//     return competition.id;
//   } catch (err) {
//     console.error(err);
//   }
// }

// export async function getExtraCircuitData(city) {
//   try {
//     const cityId = await getCityId(city);
//     console.log(cityId);
//     if (!cityId) return;
//     const response = await fetch(
//       `${API_SPORTS_URL}circuits?competition=${cityId}`,
//       requestOptions
//     );
//     const data = await response.json();
//     const [circuitData] = data.response;

//     console.log(data, circuitData);

//     if (data.results === 0) return;

//     state.schedule.map((round) =>
//       round.Circuit.Location.locality.toLowerCase() === city.toLowerCase()
//         ? (round.extraData = circuitData)
//         : ''
//     );
//     console.log(state.schedule);
//     return circuitData;
//   } catch (err) {
//     console.error(err);
//   }
// }

export async function getScheduleData() {
  try {
    // render spinner needed
    const response = await fetch(`${API_F1_URL}current.json`);
    const data = await response.json();
    state.schedule = data.MRData.RaceTable.Races;

    const flagPromises = [];
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

export async function getFlag(country) {
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

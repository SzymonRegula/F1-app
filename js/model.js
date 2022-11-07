export const state = {
  schedule: [],
  drivers: [],
};

export async function getScheduleData() {
  const response = await fetch('http://ergast.com/api/f1/2022.json');
  const data = await response.json();
  state.schedule = data.MRData.RaceTable.Races;
  console.log(state.schedule);
}

export async function getDriversData() {
  const response = await fetch('http://ergast.com/api/f1/2022/drivers.json');
  const data = await response.json();
  state.drivers = data.MRData.DriverTable.Drivers;
  console.log(state.drivers);
}

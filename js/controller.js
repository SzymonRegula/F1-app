import * as model from './model.js';
import * as view from './view.js';

const scheduleBtn = document.querySelector('.schedule');
const driversBtn = document.querySelector('.drivers');

async function showSchedule() {
  if (model.state.schedule.length === 0) {
    await model.getScheduleData();
    view.renderScheduleSection(model.state.schedule);
  }
}

async function showDrivers() {
  model.getDriversData();
}

function init() {
  scheduleBtn.addEventListener('click', showSchedule);
  driversBtn.addEventListener('click', showDrivers);
}
init();

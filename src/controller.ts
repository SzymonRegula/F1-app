import * as model from './model.js';
import scheduleView from './views/scheduleView.js';
import scheduleModalView from './views/scheduleModalView.js';

async function controlSchedule() {
  if (model.state.schedule.length === 0) {
    await model.getScheduleData();
    scheduleView.render(model.state.schedule);
  }
}

function controlScheduleModal(roundNr: string) {
  const [data] = model.state.schedule.filter(
    (round) => round.round === roundNr
  );
  console.log(data);
  scheduleModalView.render(data);
  scheduleModalView.showModal();
}

async function showDrivers() {
  model.getDriversData();
}

function init() {
  scheduleView.addHandlerClick(controlSchedule);
  scheduleModalView.addHandlerClick(controlScheduleModal);

  // driversBtn.addEventListener('click', showDrivers);
  // sectionSchedule.addEventListener('click', showScheduleModal);
}
init();

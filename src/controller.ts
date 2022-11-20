import * as model from './model.js';
import seasonView from './views/seasonView.js';
import scheduleView from './views/scheduleView.js';
import scheduleModalView from './views/scheduleModalView.js';

async function controlSeason(event: Event) {
  const year: string = (event.target as HTMLOptionElement).value;
  scheduleView.renderSpinner();

  await model.changeSeason(year);
  scheduleView.render(model.state.currentSchedule);
}

async function controlSchedule() {
  try {
    if (model.state.currentSchedule?.length === 0) {
      scheduleView.renderSpinner();
      await model.getScheduleData(model.state.season);
      model.saveSchedule();
    }
    scheduleView.render(model.state.currentSchedule);
  } catch (err) {
    console.error(err);
  }
}

function controlScheduleModal(roundNr: string) {
  const [data] = model.state.currentSchedule.filter(
    (round) => round.round === roundNr
  );
  console.log(data);
  scheduleModalView.render(data);
  scheduleModalView.showModal();
}

async function showDrivers() {
  model.getDriversData(model.state.season);
}

function init() {
  controlSchedule();
  seasonView.addHandlerChange(controlSeason);
  scheduleView.addHandlerClick(controlSchedule);
  // scheduleModalView.addHandlerClick(controlScheduleModal);

  // driversBtn.addEventListener('click', showDrivers);
  // sectionSchedule.addEventListener('click', showScheduleModal);
}
init();

import * as model from './model.js';
import seasonView from './views/seasonView.js';
import scheduleView from './views/scheduleView.js';
import scheduleModalView from './views/scheduleModalView.js';

function controlSeason(event: Event) {
  const choosenOption = event.target as HTMLOptionElement;
  const year: string = choosenOption.value;
  model.changeSeason(year);
}

async function controlSchedule() {
  try {
    if (model.state.currentSchedule.length === 0) {
      scheduleView.renderSpinner();
      await model.getScheduleData(model.state.season);
      scheduleView.render(model.state.currentSchedule);

      model.state.schedules.push({
        schedule: model.state.currentSchedule,
        season: model.state.season,
      });
    }
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
  seasonView.addHandlerChange(controlSeason);
  scheduleView.addHandlerClick(controlSchedule);
  scheduleModalView.addHandlerClick(controlScheduleModal);

  // driversBtn.addEventListener('click', showDrivers);
  // sectionSchedule.addEventListener('click', showScheduleModal);
}
init();

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as model from './model.js';
import seasonView from './views/seasonView.js';
import scheduleView from './views/scheduleView.js';
import scheduleModalView from './views/scheduleModalView.js';
function controlSeason(event) {
    const choosenOption = event.target;
    const year = choosenOption.value;
    model.changeSeason(year);
}
function controlSchedule() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (model.state.currentSchedule.length === 0) {
                scheduleView.renderSpinner();
                yield model.getScheduleData(model.state.season);
                scheduleView.render(model.state.currentSchedule);
                model.state.schedules.push({
                    schedule: model.state.currentSchedule,
                    season: model.state.season,
                });
            }
        }
        catch (err) {
            console.error(err);
        }
    });
}
function controlScheduleModal(roundNr) {
    const [data] = model.state.currentSchedule.filter((round) => round.round === roundNr);
    console.log(data);
    scheduleModalView.render(data);
    scheduleModalView.showModal();
}
function showDrivers() {
    return __awaiter(this, void 0, void 0, function* () {
        model.getDriversData(model.state.season);
    });
}
function init() {
    seasonView.addHandlerChange(controlSeason);
    scheduleView.addHandlerClick(controlSchedule);
    scheduleModalView.addHandlerClick(controlScheduleModal);
    // driversBtn.addEventListener('click', showDrivers);
    // sectionSchedule.addEventListener('click', showScheduleModal);
}
init();

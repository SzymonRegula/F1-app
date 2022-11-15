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
import scheduleView from './views/scheduleView.js';
import scheduleModalView from './views/scheduleModalView.js';
function controlSchedule() {
    return __awaiter(this, void 0, void 0, function* () {
        if (model.state.schedule.length === 0) {
            yield model.getScheduleData();
            scheduleView.render(model.state.schedule);
        }
    });
}
function controlScheduleModal(roundNr) {
    const [data] = model.state.schedule.filter((round) => round.round === roundNr);
    console.log(data);
    scheduleModalView.render(data);
    scheduleModalView.showModal();
}
function showDrivers() {
    return __awaiter(this, void 0, void 0, function* () {
        model.getDriversData();
    });
}
function init() {
    scheduleView.addHandlerClick(controlSchedule);
    scheduleModalView.addHandlerClick(controlScheduleModal);
    // driversBtn.addEventListener('click', showDrivers);
    // sectionSchedule.addEventListener('click', showScheduleModal);
}
init();

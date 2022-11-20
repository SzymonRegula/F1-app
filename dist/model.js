var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { API_F1_URL } from './config.js';
export const state = {
    season: `${new Date().getFullYear()}`,
    currentSchedule: [],
    schedules: [],
    drivers: [],
};
export function saveSchedule() {
    state.schedules.push({
        schedule: state.currentSchedule,
        season: state.season,
    });
}
export function changeSeason(year) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        state.season = year;
        state.currentSchedule = (_a = state.schedules.find((schedule) => {
            return schedule.season === year;
        })) === null || _a === void 0 ? void 0 : _a.schedule;
        console.log(state.currentSchedule);
        if (!state.currentSchedule) {
            yield getScheduleData(year);
            saveSchedule();
        }
    });
}
export function getScheduleData(season) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_F1_URL}${season}.json`);
            const data = yield response.json();
            console.log(data);
            state.currentSchedule = data.MRData.RaceTable.Races;
            console.log(state.currentSchedule);
            const flagPromises = [];
            state.currentSchedule.forEach((round) => {
                flagPromises.push(getFlag(round.Circuit.Location.country));
            });
            yield Promise.all(flagPromises).then((flags) => {
                state.currentSchedule.forEach((round, i) => {
                    round.countryFlag = flags[i];
                });
            });
            console.log(state.currentSchedule);
        }
        catch (err) {
            console.error(err);
        }
    });
}
export function getDriversData(season) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_F1_URL}${season}/drivers.json`);
            const data = yield response.json();
            state.drivers = data.MRData.DriverTable.Drivers;
            console.log('drivers', state.drivers);
        }
        catch (err) {
            console.error(err);
        }
    });
}
export function getFlag(country) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://restcountries.com/v3.1/name/${country}?fields=flags`);
            const data = yield response.json();
            const flagImg = data[0].flags.svg;
            return flagImg;
        }
        catch (err) {
            console.error(err);
        }
    });
}

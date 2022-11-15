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
    schedule: [],
    drivers: [],
};
export function getScheduleData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // render spinner needed
            const response = yield fetch(`${API_F1_URL}current.json`);
            const data = yield response.json();
            console.log(data.MRData.RaceTable.Races);
            state.schedule = data.MRData.RaceTable.Races;
            const flagPromises = [];
            state.schedule.forEach((round) => {
                flagPromises.push(getFlag(round.Circuit.Location.country));
            });
            yield Promise.all(flagPromises).then((flags) => {
                state.schedule.forEach((round, i) => {
                    round.countryFlag = flags[i];
                });
            });
            console.log(state.schedule);
        }
        catch (err) {
            console.error(err);
        }
    });
}
export function getDriversData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_F1_URL}current/drivers.json`);
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

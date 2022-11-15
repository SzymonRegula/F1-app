import { Round, Schedule } from '../types/types.js';
import View from './view.js';

class ScheduleView extends View {
  scheduleBtn = document.querySelector('.schedule');
  parentEl: HTMLElement = document.querySelector('.section-schedule');

  addHandlerClick(handler: () => Promise<void>) {
    this.scheduleBtn.addEventListener('click', handler);
  }

  generateMarkup(data: Schedule) {
    return data
      .map((round: Round) => {
        return `
          <div class="round-card" data-round="${round.round}">
            <p class="round-number">Round ${round.round}</p>      
            <ul class="round-info-list">
              <li class="round-date days"><p>${this.getDays(round)}</p></li>
              <li class="round-date month"><p>${this.getMonth(round)}</p></li>
              <li class="flag"><img class="flag-img" src="${
                round.countryFlag
              }" alt="${round.Circuit.Location.country} flag" /></li>
              <li class="country"><p>${round.Circuit.Location.country}</p></li>
              <li class="race-name"><p>${round.raceName}</p></li>
              <li class="quali"><p><span class="font-bold">Qualifying:</span> ${
                round.Qualifying.date
              }, ${round.Qualifying.time.slice(0, 5)}</p></li>
              <li class="race"><p><span class="font-bold">Race:</span> ${
                round.date
              }, ${round.time.slice(0, 5)}</p></li>
            </ul>
          </div> 
        `;
      })
      .join('');
  }

  // closeScheduleModal() {
  //   backdrop.classList.add('hidden');
  //   modalSchedule.classList.add('hidden');
  // }

  // renderScheduleModal(data) {
  //   const modalSchedule = document.querySelector('.modal-schedule');
  //   const backdrop = document.querySelector('.backdrop');
  //   modalSchedule.innerHTML = '';
  //   modalSchedule.classList.remove('hidden');
  //   backdrop.classList.remove('hidden');
  //   backdrop.addEventListener('click', closeScheduleModal);

  //   console.log(data);
  //   const markup = `

  // `;
  //   modalSchedule.insertAdjacentHTML('beforeend', markup);
  // }
}

export default new ScheduleView();

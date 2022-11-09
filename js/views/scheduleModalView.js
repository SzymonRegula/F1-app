import View from './view';

class ScheduleModalView extends View {
  parentEl = document.querySelector('.modal-schedule');
  sectionSchedule = document.querySelector('.section-schedule');
  backdrop = document.querySelector('.backdrop');

  constructor() {
    super();
    this.addHandlerHideModal();
  }

  showModal() {
    this.parentEl.classList.remove('hidden');
    this.backdrop.classList.remove('hidden');
  }

  hideModal() {
    this.parentEl.classList.add('hidden');
    this.backdrop.classList.add('hidden');
  }

  addHandlerHideModal() {
    this.backdrop.addEventListener('click', this.hideModal.bind(this));
  }

  addHandlerClick(handler) {
    this.sectionSchedule.addEventListener('click', function (e) {
      const card = e.target.closest('.round-card');
      if (!card) return;
      const roundNr = card.dataset.round;
      handler(roundNr);
    });
  }

  generateMarkup(data) {
    return `
          <div class="round-card" data-round="${data.round}">
            <p class="round-number">Round ${data.round}</p>      
            <ul class="round-info-list">
              <li class="round-date days"><p>${this.getDays(data)}</p></li>
              <li class="round-date month"><p>${this.getMonth(data)}</p></li>
              <li class="flag"><img class="flag-img" src="${
                data.countryFlag
              }" alt="${data.Circuit.Location.country} flag" /></li>
              <li class="country"><p>${data.Circuit.Location.country}</p></li>
              <li class="race-name"><p>${data.raceName}</p></li>
              <li class="quali"><p><span class="font-bold">Qualifying:</span> ${
                data.Qualifying.date
              }, ${data.Qualifying.time.slice(0, 5)}</p></li>
              <li class="race"><p><span class="font-bold">Race:</span> ${
                data.date
              }, ${data.time.slice(0, 5)}</p></li>
            </ul>
          </div> 
        `;
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

export default new ScheduleModalView();

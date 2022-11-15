import View from './view.js';
class ScheduleModalView extends View {
    constructor() {
        super();
        this.sectionSchedule = document.querySelector('.section-schedule');
        this.backdrop = document.querySelector('.backdrop');
        this.parentEl = document.querySelector('.modal-schedule');
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
            if (!card)
                return;
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
              <li class="flag"><img class="flag-img" src="${data.countryFlag}" alt="${data.Circuit.Location.country} flag" /></li>
              <li class="country"><p>${data.Circuit.Location.country}</p></li>
              <li class="race-name"><p>${data.raceName}</p></li>
              <li class="quali"><p><span class="font-bold">Qualifying:</span> ${data.Qualifying.date}, ${data.Qualifying.time.slice(0, 5)}</p></li>
              <li class="race"><p><span class="font-bold">Race:</span> ${data.date}, ${data.time.slice(0, 5)}</p></li>
            </ul>
          </div> 
        `;
    }
}
export default new ScheduleModalView();

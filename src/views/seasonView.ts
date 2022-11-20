import View from './view';

class SeasonView {
  seasonSelector = document.querySelector('.seasons');

  addHandlerChange(handler: (event: Event) => void) {
    this.seasonSelector.addEventListener('change', handler);
  }
}

export default new SeasonView();

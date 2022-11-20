class SeasonView {
    constructor() {
        this.seasonSelector = document.querySelector('.seasons');
    }
    addHandlerChange(handler) {
        this.seasonSelector.addEventListener('change', handler);
    }
}
export default new SeasonView();

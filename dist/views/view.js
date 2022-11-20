export default class View {
    render(data) {
        const markup = this.generateMarkup(data);
        this.clear();
        this.parentEl.insertAdjacentHTML('beforeend', markup);
    }
    renderSpinner() {
        const markup = `
      <div class="spinner"></div>
      `;
        this.clear();
        this.parentEl.insertAdjacentHTML('afterbegin', markup);
    }
    clear() {
        this.parentEl.innerHTML = '';
    }
    getDays(round) {
        const firstDay = round.FirstPractice.date.slice(-2);
        const lastDay = round.date.slice(-2);
        return `${firstDay}-${lastDay}`;
    }
    getMonth(round) {
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        const startMonth = +round.FirstPractice.date.slice(5, 7);
        const endMonth = +round.date.slice(5, 7);
        return `${months[startMonth - 1].toUpperCase()}${startMonth !== endMonth ? `-${months[endMonth - 1].toUpperCase()}` : ''}`;
    }
}

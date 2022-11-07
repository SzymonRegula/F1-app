function getDays(round) {
  const firstDay = round.FirstPractice.date.slice(-2);
  const lastDay = round.date.slice(-2);
  return `${firstDay}-${lastDay}`;
}

function getMonth(round) {
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
  return `${months[startMonth - 1].toUpperCase()}${
    startMonth !== endMonth ? `-${months[endMonth - 1].toUpperCase()}` : ''
  }`;
}

export async function renderScheduleSection(data) {
  const parentEl = document.querySelector('.section-schedule');
  parentEl.innerHTML = '';
  await data.forEach((round) => {
    const markup = `
        <div class="round-card">
          <ul class="round-info-list">
            <li class="round-number">Round ${round.round}</li>
            <li class="date">${getDays(round)} ${getMonth(round)}</li>
            <li class="country">${round.Circuit.Location.country}</li>
            <li class="race-name">${round.raceName}</li>
            <li class="quali">Qualifying: ${
              round.Qualifying.date
            }, ${round.Qualifying.time.slice(0, 5)}</li>
            <li class="race">Race: ${round.date}, ${round.time.slice(0, 5)}</li>
          </ul>
        </div>
  `;
    parentEl.insertAdjacentHTML('beforeend', markup);
  });
}

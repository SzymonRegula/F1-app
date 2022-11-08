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

export async function renderScheduleSection(schedule) {
  const parentEl = document.querySelector('.section-schedule');
  parentEl.innerHTML = '';
  await schedule.forEach((round) => {
    const country = round.Circuit.Location.country;
    const markup = `
        <div class="round-card">
          <ul class="round-info-list">
            <li class="round-number">Round ${round.round}</li>      
            <li class="round-date days">${getDays(round)}</li>
            <li class="round-date month">${getMonth(round)}</li>
            <li class="flag"><img class="flag-img" src="${
              round.countryFlag
            }" alt="${country} flag" /></li>
            <li class="country">${country}</li>
            <li class="race-name">${round.raceName}</li>
            <li class="quali"><span class="font-bold">Qualifying:</span> ${
              round.Qualifying.date
            }, ${round.Qualifying.time.slice(0, 5)}</li>
            <li class="race"><span class="font-bold">Race:</span> ${
              round.date
            }, ${round.time.slice(0, 5)}</li>
          </ul>
        </div>
  `;
    parentEl.insertAdjacentHTML('beforeend', markup);
  });
}

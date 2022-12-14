const pre = document.querySelector('pre');
const factSpan = document.querySelector('.fact');
const getRandomFactButton = document.querySelector('.get-random-fact-button');
const getTodaysFactButton = document.querySelector('.get-todays-fact-button');

getRandomFactButton.addEventListener('click', () => getFacts());
getTodaysFactButton.addEventListener('click', () => getFacts('today'));

const getFacts = async (randomOrToday = 'random') => {
  const url = `https://uselessfacts.jsph.pl/${randomOrToday}.json?language=en`;
  const response = await fetch(url);
  const fact = await response.json();
  factSpan.innerHTML = `${fact.text}<span class="asterisk">*</span>`;
}

getFacts();
const getRandomFactButton = document.querySelector('.get-random-fact-button');
const getTodaysFactButton = document.querySelector('.get-todays-fact-button');
const factSpan = document.querySelector('.fact');

getTodaysFactButton.addEventListener('click', () => getFacts('today'));
getRandomFactButton.addEventListener('click', () => getFacts());

const getFacts = async (randomOrToday = 'random') => {
  try {
    const url = `https://uselessfacts.jsph.pl/${randomOrToday}.json?language=en`;
    const response = await fetch(url);

    if (response.status === 200) {
      const fact = await response.json();
      factSpan.innerHTML = `${fact.text.trim()}<span class="asterisk">*</span>`;
    } else if (response.status === 429) {
      alert('There is a limit of 30 requests per minute. Please wait 60 seconds and then try again.');
    }
  } catch(err) {
    alert(`There was an error: ${err}`);
  }
}

getFacts();
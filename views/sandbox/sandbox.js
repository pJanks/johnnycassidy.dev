const form = document.querySelector('.height-and-width');
form.addEventListener('submit', (e) => handleFormSubmission(e));

const handleFormSubmission = (e) => {
  e.preventDefault();

  const potentialHeight = Number(document.querySelector('.height').value);
  const potentialWidth = Number(document.querySelector('.width').value);
  const isOrientationVertical = document.querySelector('.vertical').checked;

  const height = isOrientationVertical ? potentialHeight : potentialWidth;
  const width = isOrientationVertical ? potentialWidth : potentialHeight;
  const calculations = getProfilesRailsAndAngles(height, width);

  const profilesNeededSpan = document.querySelector('.profiles-needed');
  const railsNeededSpan = document.querySelector('.rails-needed');
  const anglesNeededSpan = document.querySelector('.angles-needed');

  const profilesPriceSpan = document.querySelector('.profiles-price');
  const railsPriceSpan = document.querySelector('.rails-price');
  const anglesPriceSpan = document.querySelector('.angles-price');

  profilesNeededSpan.innerText = `Profiles Needed: ${calculations.profilesNeeded}`;
  railsNeededSpan.innerText = `Rails Needed: ${calculations.railsNeeded}`;
  anglesNeededSpan.innerText = `Angles Needed: ${calculations.anglesNeeded}`;

  profilesPriceSpan.innerText = `Profiles Price: $${calculations.profilesPrice}`;
  railsPriceSpan.innerText = `Rails Price: $${calculations.railsPrice}`;
  anglesPriceSpan.innerText = `Angles Price: $${calculations.anglesPrice}`;
}

const getProfilesRailsAndAngles = (height, width) => {
  const calculations = {};
  
  const widthInInches = width * 12;
  const profileWidth = Math.ceil(1.57 + .4);
  const profilesToWidth = Math.ceil(widthInInches / profileWidth);
  const fullNineteenFootProfilesCalc = Math.floor(height / 19);
  const partialProfileHeightCalc = height - (fullNineteenFootProfilesCalc * 19);
  const initialFullProfilesNeeded = Math.ceil(fullNineteenFootProfilesCalc * profilesToWidth);
    
  const railsToHeight = Math.ceil(height / 3);
  const fullNineteenFootRailsCalc = Math.floor(width / 19);
  const partialRailsWidthCalc = width - (fullNineteenFootRailsCalc * 19);
  const initialFullRailsNeeded = Math.ceil(fullNineteenFootRailsCalc * railsToHeight);

  calculations.profilesNeeded = initialFullProfilesNeeded;
  calculations.railsNeeded = initialFullRailsNeeded;
  calculations.anglesNeeded = Math.ceil(width / 19) * 2;

  if (partialProfileHeightCalc && partialProfileHeightCalc >= 16) {
    calculations.profilesNeeded += profilesToWidth;
  } else if (partialProfileHeightCalc && partialProfileHeightCalc <= 9) {
    calculations.profilesNeeded += Math.ceil(profilesToWidth / Math.floor(19 / partialProfileHeightCalc));
  } else if (partialProfileHeightCalc) {
    const wallAHeight = 9;
    const wallBHeight = partialProfileHeightCalc - wallAHeight;
    calculations.profilesNeeded += Math.ceil(profilesToWidth / Math.floor(19 / wallAHeight));
    calculations.profilesNeeded += Math.ceil(profilesToWidth / Math.floor(19 / wallBHeight));
  }

  if (partialRailsWidthCalc && partialRailsWidthCalc >= 16) {
    calculations.railsNeeded += railsToHeight;
  } else if (partialRailsWidthCalc && partialRailsWidthCalc <= 9) {
    calculations.railsNeeded += Math.ceil(railsToHeight / Math.floor(19 / partialRailsWidthCalc));
  } else if (partialRailsWidthCalc) {
    const wallAWidth = 9;
    const wallBWidth = partialRailsWidthCalc - wallAWidth;
    calculations.railsNeeded += Math.ceil(railsToHeight / Math.floor(19 / wallAWidth));
    calculations.railsNeeded += Math.ceil(railsToHeight / Math.floor(19 / wallBWidth));
  }

  calculations.profilesPrice = (calculations.profilesNeeded * 3.5 * 19).toFixed(2);
  calculations.railsPrice = (calculations.railsNeeded * 113.24).toFixed(2);
  calculations.anglesPrice = (calculations.anglesNeeded * 3.36 * 19).toFixed(2);
  
  return calculations;
}
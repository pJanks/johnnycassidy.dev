const possibleRoute = location.pathname.split('/')[1].toLowerCase();
const route = possibleRoute ? possibleRoute : 'home';

if (route !== '404' && route !== 'sandbox') {
  const currentPageLink = document.querySelector(`.${route}-nav-list-item-link`);
  currentPageLink.href = '#';
  currentPageLink.style.textDecoration = 'underline';
}
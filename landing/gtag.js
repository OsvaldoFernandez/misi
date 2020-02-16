const getCookie = (c_name) => {
    return localStorage.getItem(c_name);
}

const setCookie = (c_name, value) => {
    return localStorage.setItem(c_name, value);
}

window.trackingID = getCookie('tracking_id')

if (!window.trackingID) {
  const array = ['UA-158607365-1','UA-158607365-2']; // Get from backend
  window.trackingID = array[Math.floor(Math.random() * array.length)];
  setCookie('tracking_id', window.trackingID);
}

var JSLink = `https://www.googletagmanager.com/gtag/js?id=${window.trackingID}`;
var JSElement = document.createElement('script');
JSElement.src = JSLink;
document.getElementsByTagName('head')[0].appendChild(JSElement);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', window.trackingID);

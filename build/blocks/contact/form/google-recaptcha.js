/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************************************!*\
  !*** ./src/blocks/contact/form/google-recaptcha.js ***!
  \*****************************************************/
const recaptchaCheck = document.querySelector('#recaptcha-script');

if (recaptchaCheck === undefined || recaptchaCheck === null) {
  const recaptcha = document.createElement('script');
  recaptcha.id = 'recaptcha-script';
  recaptcha.src = 'https://www.google.com/recaptcha/api.js?render=6LdwMnYiAAAAANcMWs9cI_h9V5wqM6xD178DL5lk';
  document.head.append(recaptcha);
}
/******/ })()
;
//# sourceMappingURL=google-recaptcha.js.map
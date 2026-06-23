import '@babel/polyfill';
import moment from 'moment';
import { login, logout } from './login';
import { contactUs } from './contactUs';
import { calendar } from './calendar';
import { placeAndPeriod, sendSchedule } from './schedule';
import { showAlert } from './alerts';

let year = moment().format('YYYY');
let month = moment().format('MM');
const loginForm = document.querySelector('.login-form');
const logoutLink = document.querySelector('.logout-link');
const mobileLogoutLink = document.querySelector('.mobile-logout-link');
const contactUsForm = document.querySelector('.contact-form');
const calendarForm = document.querySelector('.calendar');
const scheduleForm = document.querySelector('#schedule-form');
const scheduleFormPlace = document.querySelector('#schedule-place');
const agreementCheck = document.querySelector('#agreement-check');
const scheduleSubmitButton = document.querySelector('#schedule-submit-button');
const sexSelect = document.querySelector("#sex");
const sexDefault = document.querySelector("#sex-default");
const schedulePlaceSelect = document.querySelector("#schedule-place");
const schedulePlaceDefault = document.querySelector("#place-default");
// const schedulePeriodSelect = document.querySelector("#schedule-period");
// const schedulePeriodDefault = document.querySelector("#period-default");
const scheduleTypeSelect = document.querySelector("#schedule-type");
const scheduleTypeDefault = document.querySelector("#type-default");

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    login(email, password);
  });
}

if (logoutLink) {
  logoutLink.addEventListener('click', logout);
}

if (mobileLogoutLink) {
  mobileLogoutLink.addEventListener('click', logout);
}

if (contactUsForm) {
  contactUsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-form-name').value;
    const email = document.getElementById('contact-form-email').value;
    const subject = document.getElementById('contact-form-subject').value;
    const text = document.getElementById('contact-form-text').value;
    const wechat = document.getElementById('contact-form-wechat').value;
    contactUs(name, email, subject, text, wechat);
  });
}

if (calendarForm) {
  calendar(year, month);
}

if (scheduleForm) {
  sexSelect.addEventListener('change', (e) => {
    e.preventDefault();
    sexDefault.remove();
  });
  schedulePlaceSelect.addEventListener('change', (e) => {
    e.preventDefault();
    schedulePlaceDefault.remove();
  });
  scheduleTypeSelect.addEventListener('change', (e) => {
    e.preventDefault();
    scheduleTypeDefault.remove();
  });
  scheduleFormPlace.addEventListener('change', (e) => {
    e.preventDefault();
    // 1-10 与前端对应 分别读取1-10的课程价格数组
    if (scheduleFormPlace.value === '1') placeAndPeriod(1); // 舞子高原滑雪场/栂池高原滑雪场
    if (scheduleFormPlace.value === '2') placeAndPeriod(2); // 汤泽/白马地区其他滑雪场
    if (scheduleFormPlace.value === '3') placeAndPeriod(3); // 其他地区
  });
  agreementCheck.addEventListener('change', function () {
    if (this.checked) {
      scheduleSubmitButton.disabled = false;
    } else {
      scheduleSubmitButton.disabled = true;
    }
  });
  scheduleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('schedule-name').value;
    const sex = document.getElementById('sex').value;
    const place = document.getElementById('schedule-place').value;
    const period = document.getElementById('schedule-period').value;
    const type = document.getElementById('schedule-type').value;
    const startDate = document.getElementById('datetimepicker1').value;
    const endDate = document.getElementById('datetimepicker2').value;
    const wechat = document.getElementById('schedule-wechat').value;
    const phone = document.getElementById('schedule-phone').value;
    const email = document.getElementById('schedule-email').value;
    const email2 = document.getElementById('schedule-email-confirm').value;
    const channel = document.getElementById('schedule-channel').value;
    const note = document.getElementById('schedule-note').value;
    let emailConfirm = true;
    if (email !== email2) {
      emailConfirm = false;
    }
    sendSchedule(
      name,
      sex,
      place,
      period,
      type,
      startDate,
      endDate,
      wechat,
      phone,
      email,
      emailConfirm,
      channel,
      note
    );
  });
}

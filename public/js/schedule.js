import axios from 'axios';
import { showAlert } from './alerts';

// @TODO 这个以后需要数据库话，从API请求
// const AllCourse = await axios({
//     method: 'GET',
//     url: `http://localhost:5000/api/v1/course/`
//   });
const AllCourse = [
  [
    '2小时（1~2人）：30,000 JPY',
    '2小时（3~5人）：45,000 JPY',
    '4小时（1~2人）：48,000 JPY',
    '4小时（3~5人）：68,000 JPY',
    '6小时（1~2人）：70,000 JPY',
    '6小时（3~5人）：90,000 JPY',
    'VIP 6小时（1~2人）：85,000 JPY',
    'VIP 6小时（3~5人）：105,000 JPY',
  ],
  [
    '2小时（1~2人）：33,000 JPY',
    '2小时（3~5人）：48,000 JPY',
    '4小时（1~2人）：52,000 JPY',
    '4小时（3~5人）：72,000 JPY',
    '6小时（1~2人）：75,000 JPY',
    '6小时（3~5人）：95,000 JPY',
    'VIP 6小时（1~2人）：92,000 JPY',
    'VIP 6小时（3~5人）：112,000 JPY',
  ],
  ['定制时长'],
];

export const placeAndPeriod = async (index) => {
  const scheduleFormPeriod = document.querySelector('#schedule-period');
  const scheduleFormPeriodWrap = document.querySelector(
    '.schedule-period-wrap'
  );
  const periodAll = AllCourse[index - 1];
  scheduleFormPeriod.remove();
  const scheduleFormPeriodNew = document.createElement('select');
  scheduleFormPeriodNew.classList.add('schedule-period');
  scheduleFormPeriodNew.setAttribute('id', 'schedule-period');
  scheduleFormPeriodWrap.appendChild(scheduleFormPeriodNew);
  periodAll.forEach((element, elementIndex) => {
    const optionElement = document.createElement('option');
    optionElement.value = `${index}-${elementIndex + 1}`;
    const optiontext = document.createTextNode(element);
    optionElement.appendChild(optiontext);
    scheduleFormPeriodNew.appendChild(optionElement);
  });
};

export const sendSchedule = async (
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
) => {
  // @@TODO 性别 授课地区 时长 课程种类 日期的前端检测
  if (sex === 'male') {
    sex = '男';
  } else {
    sex = '女';
  }
  if (type === 'snowboard') {
    type = '单板';
  } else {
    type = '双板';
  }
  if (place === '1') {
    place = '舞子高原滑雪场/栂池高原滑雪场';
    if (period === '1-1') period = AllCourse[0].splice(',')[0];
    if (period === '1-2') period = AllCourse[0].splice(',')[1];
    if (period === '1-3') period = AllCourse[0].splice(',')[2];
    if (period === '1-4') period = AllCourse[0].splice(',')[3];
    if (period === '1-5') period = AllCourse[0].splice(',')[4];
    if (period === '1-6') period = AllCourse[0].splice(',')[5];
    if (period === '1-7') period = AllCourse[0].splice(',')[6];
    if (period === '1-8') period = AllCourse[0].splice(',')[7];
  } else if (place === '2') {
    place = '汤泽/白马地区其他滑雪场';
    if (period === '2-1') period = AllCourse[1].splice(',')[0];
    if (period === '2-2') period = AllCourse[1].splice(',')[1];
    if (period === '2-3') period = AllCourse[1].splice(',')[2];
    if (period === '2-4') period = AllCourse[1].splice(',')[3];
    if (period === '2-5') period = AllCourse[1].splice(',')[4];
    if (period === '2-6') period = AllCourse[1].splice(',')[5];
    if (period === '2-7') period = AllCourse[1].splice(',')[6];
    if (period === '2-8') period = AllCourse[1].splice(',')[7];
  } else if (place === '3') {
    place = '其他地区';
    period = period = AllCourse[2].splice(',')[0];
  }
  const payload = {
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
    note,
  };
  console.log(payload);
  try {
    const res = await axios({
      method: 'POST',
      url: `https://jcosa.net/schedule`,
      data: payload,
    });
    if (res.data.success == true) {
      showAlert('success', `${res.data.message}`);
      window.setTimeout(() => {
        // 确认页
        location.assign('/');
      }, 2000);
    }
  } catch (err) {
    showAlert('danger', err.response.data.error);
  }
};

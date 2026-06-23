export const hideAlert = () => {
  const element = document.querySelector('.alert');
  if (element) element.parentElement.removeChild(element);
};

// Type可以是‘success'或‘danger’因为要调用bootstrap class
export const showAlert = (type, message) => {
  hideAlert();
  const regex = /,/gi;
  message = message.replace('ValidationError:', '错误：');
  message = message.replace(regex, '，');
  if (message.includes('name: ')) message = message.replace('name: ', '');
  if (message.includes('startDate:'))
    message = message.replace('startDate:', '');
  if (message.includes('endDate: ')) message = message.replace('endDate: ', '');
  if (message.includes('wechat: ')) message = message.replace('wechat: ', '');
  if (message.includes('phone: ')) message = message.replace('phone: ', '');
  if (message.includes('email: ')) message = message.replace('email: ', '');
  if (message.includes('channel: ')) message = message.replace('channel: ', '');
  const markup = `<div class="alert alert-${type} text-center rounded-0 mt-10">${message}</div>`;
  // document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  document
    .querySelector('.alert-required')
    .insertAdjacentHTML('afterend', markup);
  window.setTimeout(hideAlert, 5000);
};

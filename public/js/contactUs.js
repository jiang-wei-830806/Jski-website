import axios from 'axios';
import { showAlert } from './alerts';

export const contactUs = async (name, email, subject, text, wechat) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `https://jcosa.net/contact`,
      data: {
        name,
        email,
        subject,
        text,
        wechat,
      },
    });
    console.log(res.data);
    if (res.data.success == true) {
      showAlert('success', `${res.data.message}`);
      window.setTimeout(() => {
        location.assign('/');
      }, 5000);
    }
  } catch (err) {
    showAlert('danger', err.response.data.error);
  }
};

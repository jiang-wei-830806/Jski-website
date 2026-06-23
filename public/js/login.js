import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://localhost:5000/api/v1/auth/login`,
      data: {
        email,
        password
      }
    });

    // console.log(res.data);
    if (res.data.success == true) {
      showAlert('success', `已成功登录，正在跳转....`);
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('danger', err.response.data.error);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:5000/api/v1/auth/logout`
    });
    if (res.data.success == true) {
      location.reload(true); // reload(true) 强制从后端刷新
    }
  } catch (err) {
    showAlert('danger', `登出过程中出错，请重试...`);
  }
};
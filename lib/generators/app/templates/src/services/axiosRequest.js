import axios from 'axios';
import router from '~router';
axios.defaults.timeout = 100000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? './api/' : '/api/';
// POST传参序列化
axios.interceptors.request.use(
  config => {
    if (sessionStorage.token) {
      config.headers['x-hzdamei'] = sessionStorage.token;
    }
    if (config.method === 'post') {
      let formdata = new FormData();
      for (let k in config.data) {
        formdata.append(k, config.data[k]);
      }
      config.data = formdata;
    }
    return config;
  },
  error => {
    if (error) {
      console.log('axios.interceptors.request', error);
    }
    const err = {
      data: {
        msg: '错误的传参!',
      },
    };
    return Promise.reject(err);
  },
);
// code状态码200判断
axios.interceptors.response.use(
  res => {
    if (Number(res.data.code) === 403) {
      router.push('/login');
      return Promise.reject(res);
    }
    if (Number(res.data.code) !== 200) {
      return Promise.reject(res);
    }
    return res;
  },
  error => {
    if (error) {
      console.log('axios.interceptors.response', error);
    }
    const err = {
      data: {
        msg: '网络有点慢,换个姿势再来一次!',
      },
    };
    return Promise.reject(err);
  },
);
// export default axios;

/**
 * axios实现fetch
 * @param {*Object} conf axios的config
 * @param {*Function} cb 成功响应处理函数
 * @return {*Promise}
 */
export const fetch = conf => cb => {
  return axios(conf)
    .then(res => {
      cb(res.data.data);
    })
    .catch(err => {
      if (err.data && err.data.msg) {
        console.log(err.data.msg);
      }
    });
};

/**
 * axios实现post
 * @param {*Object} conf axios的config
 * @param {*Function} cb 成功响应处理函数
 * @param {*Function} errCb 失败响应处理函数
 * @return {*Promise}
 */
export const post = conf => cb => errCb => {
  return axios(conf)
    .then(res => {
      cb(res.data.data);
    })
    .catch(err => {
      if (err.data.msg) {
        console.log(err.data.msg);
      }
      errCb();
    });
};

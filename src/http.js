import axios from 'axios'
import store from './store/index.js'
import router from './router'

axios.defaults.timeout = 50000;
//允许传cookie
//axios.defaults.withCredentials = true;  
axios.defaults.baseURL = process.env.API_ROOT;
var states = JSON.parse(localStorage.getItem('register'));

axios.interceptors.request.use(
  config => {
    if (states && states.token) {
      config.headers["Authorization"] = states.token
    } else {
    };
    return config;
  },
  err => {
    //          return Promise.reject(err);
  });

export default axios;

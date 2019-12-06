import axios from 'axios'
import store from './../store/index.js'
import router from './../router'
//import {
//Message 
//} from 'element-ui';
import  Message  from 'element-ui/lib/message';
//配置API地址
//var root = process.env.API_ROOT
//var states=JSON.parse(localStorage.getItem('register'));
//if (states&&states.token) { 
//  axios.defaults.headers.common["Authorization"] = states.token
//} 
function apiAxios(method, url, params) {
  return new Promise((resolve, reject) => {
    axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
//      baseURL: root,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(function (res) {
        if (res.data.status == 200) {
          resolve(res.data);
        } else {
          if (res.data.status == 401) {
            router.replace({
              path: '/',
            })
          }else{
            Message({
		          showClose: true,
		          message: (res.data.errMsg|| '服务端发生异常'),
		          type: 'error',
		          duration:3000
		        });
          }
 

        }
      }
//    , err => {
//    }
      );
  })
}

//post API
export function axiosPostAPI(url, params) {
  return apiAxios('POST', url, params);
}

//get API
export function axiosGetAPI(url, params = {}) {
  return apiAxios('GET', url, params);
}

//put API
export function axiosPutAPI(url, params = {}) {
  return apiAxios('PUT', url, params);
}

//delete API
export function axiosDeleteAPI(url, params = {}) {
  return apiAxios('DELETE', url, params);
}

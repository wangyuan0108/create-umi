<% if (isAxios) { %> import {fetch, post} from '@/services/axiosRequest.js';<% }else { %> import request from '@/services/request'; <%}%>
<% if (isAxios){ %>
export const login = (conf)=>(cb)=> {
  return fetch({
    method: 'post',
    url: '/api/login', //接口名称
    params:conf,
  })(cb);
}

/**
 * 添加
 */
const add = (conf) => (cb) => (errCb) => {
  return post({
      method: 'post',
      url: 'advertisement/add.html',
      data: conf
  })(cb)(errCb);
};
<% } else { %>
export function login(data) {
  return request({
    url: '/api/login', //接口名称
    method: 'post',
    data,
  });
}
<% } %>


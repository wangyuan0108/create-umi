import request from '@/services/request';

export function login(data) {
  return request({
    url: '/api/login', //接口名称
    method: 'post',
    data,
  });
}


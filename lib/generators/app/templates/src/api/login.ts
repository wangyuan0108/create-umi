import request from '@/services/request';
import { ILoginParams } from '@/typings/login';

export function login(data: ILoginParams) {
  return request({
    url: '/api/login', //接口名称
    method: 'post',
    data,
  });
}

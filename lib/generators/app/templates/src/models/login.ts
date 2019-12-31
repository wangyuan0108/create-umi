import { login } from '@/api/login';

export default {
  namespace: 'spending', // 命名空间名字，必填
  state: {
    // state就是用来放初始值的
    payCode: '00',
  },
  /**
   * // 能改变界面的action应该放这里,
   * 这里按官方意思不应该做数据处理，只是用来return state 从而改变界面
   */
  // 与后台交互，处理数据逻辑的地方
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload); /*  */
      console.log('speding', response);
    },
  },
  reducers: {},
};


import request from '@/utils/request'
// 注册接口
export const userRegisterService = ({ username, password, code }) =>
  request.post('/userAuth/register', { username, password, code })

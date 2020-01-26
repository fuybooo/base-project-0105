import rn from '@/router/router.name'

export function login (form: any) {
  const me: any = this
  // 发送登录请求
  // 提示登录结果
  // 根据返回结果跳转
  me.$router.push(rn.home)
}

import request from '@/utils/request'

export function login (data) {
  // return request({
  //   url: '/login',
  //   method: 'post',
  //   data
  // })

  return {
    error: 0,
    msg: 'OK',
    data: {
      language: 'en',
      user: {
        email: 'admin@org.com',
        phone: '15290788137',
        username: '管理员',
        id: '601d85900f43923hffbcs',
        token: '4v8acea-6a89-2a2ebc-10802-9ac19003'
      }
    }
  }
}
export function logout () {
  return request({
    url: '/logout',
    method: 'post'
  })
}

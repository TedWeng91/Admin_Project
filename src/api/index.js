import axios from 'axios'

const BaseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = BaseURL

// 设置拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = localStorage.getItem('mytoken')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 登陆验证
export const checkUser = params => {
  return axios.post('login', params).then(res => res.data)
}

// 获取用户列表
export const getuserlist = params => {
  return axios.get('users', params).then(res => res.data)
}

// 更改用户状态
export const changestate = params => {
  return axios.put(`users/${params.uId}/state/${params.type}`).then(res => res.data)
}

// 添加用户功能
export const adduser = params => {
  return axios.post('users', params).then(res => res.data)
}

// 根据Id获取用户信息
export const getuserbyid = params => {
  return axios.get(`users/${params}`).then(res => res.data)
}

// 更改用户状态
export const edituser = params => {
  return axios.put(`users/${params.id}`, params).then(res => res.data)
}

// 删除用户
export const deleteuser = params => {
  return axios.delete(`users/${params}`).then(res => res.data)
}

// 获取角色列表
export const getroleslist = params => {
  return axios.get('roles').then(res => res.data)
}

// 分配用户角色
export const grantuser = params => {
  return axios.put(`users/${params.id}/role`, {id: params.id, rid: params.rid}).then(res => res.data)
}

// 获取权限列表
export const getrightlist = params => {
  return axios.get(`rights/${params.type}`).then(res => res.data)
}

// 删除角色指定权限
export const deleteright = params => {
  return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`).then(res => res.data)
}

// 分配角色权限
export const grantright = params => {
  return axios.post(`roles/${params.roleId}/rights`, {rids: params.rids}).then(res => res.data)
}

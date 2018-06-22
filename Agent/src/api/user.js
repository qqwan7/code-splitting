/**
 * Created by qqwan on 2018/4/18.
 */
import fetch from '@/common/fetch'
import { uri } from './uri'
// login
export function login (data) {
  return fetch({
    url: uri.login,
    method: 'post',
    data
  })
}
// get routers
export function getRouters () {
  return fetch({
    url: uri.getRouters,
    method: 'get'
  })
}

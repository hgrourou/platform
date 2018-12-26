import request from '@/utils/request'

/**
 * 验证当前函数是否可用
 * @param {*} data 
 */
export function validateFunction(data) {
  return request({
    url: '/h5/function/validate',
    method: 'post',
    data
  })
}

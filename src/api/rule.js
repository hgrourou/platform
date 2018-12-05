import request from '@/utils/request'

export function saveRules(data) {
  return request({
    url: '/h5/rule/saveList',
    method: 'post',
    data
  })
}

export function getRules(data) {
  return request({
    url: '/h5/rule/select',
    method: 'post',
    data
  })
}

export function deleteRule(data) {
  return request({
    url: '/h5/rule/delete',
    method: 'post',
    data
  })
}
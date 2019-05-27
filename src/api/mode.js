import request from '@/utils/request'

export function getMode() {
  return request({
    url: '/h5/config/select',
    method: 'post',
    data: {
      isactive: true
    }
  })
}

export function saveModeRules(data) {
  return request({
    url: '/h5/config/saveList',
    method: 'post',
    data
  })
}

export const deleteItem = (data) => {
  return request({
    url: '/h5/config/delete',
    method: 'post',
    data
  })
}
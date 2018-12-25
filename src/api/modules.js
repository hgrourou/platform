import request from '@/utils/request'


/**
 * 获取当前这套规则对应的modules
 * @param {*} data 
 */
export function getAllModules(data) {
  return request({
    url: '/h5/module/select',
    method: 'post',
    data
  })
}

/**
 * 更改module name
 */
export function updateModuleName(data) {
  return request({
    url: '/h5/module/update',
    method: 'post',
    data
  })
}

/**
 * 创建module
 */
export function createModule(data) {
  return request({
    url: '/h5/module/saveList',
    method: 'post',
    data
  })
}

/**
 * 创建module
 */
export function deleteModule(data) {
  return request({
    url: '/h5/module/delete',
    method: 'post',
    data
  })
}

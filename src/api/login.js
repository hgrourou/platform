import request from '@/utils/request'
import { resolve } from 'path';
import { rejects } from 'assert';

export function login(username, password) {
    // return request({
    //     url: '/user/login',
    //     method: 'post',
    //     data: {
    //         username,
    //         password
    //     }
    // })
    return new Promise((resolve, rejects) => {
        resolve({
            code: 1,
            data: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTQzODM5ODEyLCJleHAiOjE1NDM5MjYyMTJ9.nZHaCZ88zVG2IsT9rnABByYCvcUr-3QPrEcKk55Zax4',
            },
            message: '获取token成功'
        })
    })
}

export function getInfo(token) {
    // return request({
    //     url: '/user/info',
    //     method: 'get',
    //     params: { token }
    // })
    return new Promise((resolve, rejects) => {
        resolve({
            code: 1,
            data: {
                avatar: 'https://randy168.com/1533262153771.gif',
                name: 'username',
                roles: ["admin"]
            }
        })
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}

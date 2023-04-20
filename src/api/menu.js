import request from '../utils/request'
export const getRouters = () => {
    return request({
        url: '/getRouters',
        method: 'GET'
    })
}
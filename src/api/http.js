//请求访问封装
import axios from 'axios';
import router from '@/router';


// 超时时间 5s
axios.defaults.timeout = 5000;
// 允许跨域
// axios.defaults.withCredentials = true;
// 基础url
axios.defaults.baseURL = "http://localhost:1234";
// 响应头 Content-Type
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/**
 * 封装get访问
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(resp => {
                resolve(resp.data)
            })
            .catch(err => {
                reject(err)
            })
    });
}

/**
 * 封装post访问
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(resp => {
                resolve(resp.data)
            })
            .catch(err => {
                reject(err)
            })
    });
}

/**
 * 封装delete访问
 */
export function deleteInfo(url, params) {
    return new Promise((resolve, reject) => {
            axios.delete(url + '/' + params)
        .then(resp => {
            resolve(resp.data)
        })
        .catch(err => {
            reject(err)
        })
    });
}

/**
 * 封装put访问
 */
export function updateInfo(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(resp => {
                resolve(resp.data)
            })
            .catch(err => {
                reject(err)
            })
    });
}

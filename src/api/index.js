//逻辑处理工具

import {
    get,
    post,
    deleteInfo,
    updateInfo,
} from "./http";

//查询数据
// export const getSongData = (page, pageSize, name, singerId) => get('song?name=' + name +'&singerId=' + singerId  +'&page=' + page + '&pageSize=' + pageSize)
export const getList = (page, pageSize, name) => get('infolist?name=' + name +'&page=' + page + '&pageSize=' + pageSize)

//新增数据
export const addUserInfo = (params) => post('adduser', params)

//修改数据
export const updateUserInfo = (params) => post('updateuser', params)

//删除数据
export const deleteUserInfo = (params) => deleteInfo('deleteuser', params)
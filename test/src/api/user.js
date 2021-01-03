import axios from '../../src/utils/request';
//用户管理查询
const getUserSearch = (page = 1, size = 10) =>
  axios.request({
    url: `user/v1/list`,
    method: 'get',
    params: {
      page,
      size,
    },
  });
//组别下拉查询
const getUserGroup = () =>
  axios.request({
    url: `group/v1/list`,
    method: 'get',
  });
//角色下拉查询
const getUserRole = () =>
  axios.request({
    url: `role/v1/list`,
    method: 'get',
  });
//用户管理新增
const getUserAdd = ({ uid, username, group, role, state }) =>
  axios.request({
    url: `user/v1/detail`,
    method: 'POST',
    data: {
      optype: '0',
      data: {
        uid,
        username,
        group,
        role,
        state
      }
    }
  });
//用户管理修改
const getUserEdit = ({ uid, username, group, role, state }) =>
  axios.request({
    url: `user/v1/detail`,
    method: 'POST',
    data: {
      optype: '1',
      data: {
        uid,
        username,
        group,
        role,
        state
      }
    }

  });
//用户详情
const getUserDetail = ({ user }) =>
  axios.request({
    url: `/user/v1/detail`,
    method: 'get',
    params: {
      user,
    },
  });
export { getUserSearch, getUserGroup, getUserRole, getUserAdd, getUserEdit, getUserDetail };
import request from './request';

/**
 * 用户相关的 api 都放在这里
 */
// 验证码
export const getCaptcha = () => {
    return request({
        url: '/res/captcha',
        method: 'GET',
    });
};

// 查询用户是否存在
export const userIsExist = (loginId) => {
    return request({
        url: `/api/user/userIsExist/${loginId}`,
        method: 'GET',
    });
};

// 用户注册
export const addUser = (newUserInfo) => {
    return request({
        url: '/api/user',
        data: newUserInfo,
        method: 'POST',
    });
};

// 用户登录
export const userLogin = (loginInfo) => {
    return request({
        url: '/api/user/login',
        method: 'POST',
        data: loginInfo,
    });
};

// 根据 id 来查找用户
export const getUserById = (id) => {
    return request({
        url: `/api/user/${id}`,
        method: 'GET',
    });
};

// 恢复登录状态
export const getInfo = () => {
    return request({
        url: '/api/user/whoami',
        method: 'GET',
    });
};

// 获取积分前十的用户
export const getUserByPointsRank = () => {
    return request({
        url: '/api/user/pointsrank',
        method: 'GET',
    });
};

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

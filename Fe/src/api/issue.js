import request from './request';

// 分页获取问答
export const getIssueByPage = (params) => {
    return request({
        url: '/api/issue',
        method: 'GET',
        params: {
            ...params,
        },
    });
};

// 新增问答
export const addIssue = (newIssue) => {
    return request({
        url: '/api/issue/',
        method: 'POST',
        data: newIssue,
    });
};

// 根据 id 获取面试题的详情
export const getIssueById = (issueId) => {
    return request({
        url: `/api/issue/${issueId}`,
        method: 'GET',
    });
};

// 更新问答
export const updateIssue = (issueId, newIssueInfo) => {
    return request({
        url: `/api/issue/${issueId}`,
        method: 'PATCH',
        data: newIssueInfo,
    });
};

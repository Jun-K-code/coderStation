import React from 'react';
import { NavLink } from 'react-router-dom';
import { Space, Select, Input, Button } from 'antd';

const options = [
    {
        label: '问答',
        value: 'issue',
    },
    {
        label: '书籍',
        value: 'book',
    },
];
export const NavHeader = () => {
    return (
        <div className="headerContainer">
            {/* 头部logo */}
            <div className="logoContainer">
                <div className="logo"></div>
            </div>
            {/* 头部导航 */}
            <nav className="navContainer">
                <NavLink to="/" className="navigation">
                    问答
                </NavLink>
                <NavLink to="/books" className="navigation">
                    书籍
                </NavLink>
                <NavLink to="/interviews" className="navigation">
                    面试题
                </NavLink>
                <a
                    className="navigation"
                    href="https://duyi.ke.qq.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    视频教程
                </a>
            </nav>
            {/* 搜索框 */}
            <div className="searchContainer">
                <Space.Compact>
                    <Select defaultValue="issue" options={options} size="large" />
                    <Input.Search
                        placeholder="请输入要搜索的内容"
                        allowClear
                        enterButton="搜索"
                        size="large"
                        style={{ width: '80%' }}
                    />
                </Space.Compact>
            </div>
            {/* 登录按钮 */}
            <div className="loginBtnContainer">
                <Button type="primary" size="large">
                    注册/登录
                </Button>
            </div>
        </div>
    );
};

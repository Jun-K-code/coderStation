import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Space, Select, Input } from 'antd';

import LoginAvatar from './LoginAvatar';

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
export const NavHeader = (props) => {
    const navigate = useNavigate();
    const [searchOption, setSearchOption] = useState('issue');

    const onSearch = (value) => {
        if (value) {
            // 搜索框有内容，需要进行搜索操作
            navigate('/searchPage', {
                state: {
                    value,
                    searchOption,
                },
            });
        } else {
            // 搜索框没有内容，跳转到首页
            navigate('/');
        }
    };

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
                <a
                    className="navigation"
                    href="https://juejin.cn/"
                    target="_blank"
                    rel="noreferrer"
                >
                    掘金
                </a>
            </nav>
            {/* 搜索框 */}
            <div className="searchContainer">
                <Space.Compact>
                    <Select
                        defaultValue="issue"
                        options={options}
                        size="large"
                        onChange={(val) => {
                            setSearchOption(val);
                        }}
                    />
                    <Input.Search
                        placeholder="请输入要搜索的内容"
                        allowClear
                        enterButton="搜索"
                        size="large"
                        style={{ width: '80%' }}
                        onSearch={onSearch}
                    />
                </Space.Compact>
            </div>
            {/* 登录按钮 */}
            <div className="loginBtnContainer">
                <LoginAvatar loginHandle={props.loginHandle} />
            </div>
        </div>
    );
};

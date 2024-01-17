import { Button, List, Popover, Avatar, Image } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

import { clearUserInfo, changeLoginStatus } from '../redux/userSlice';

import styles from '../css/LoginAvatar.module.css';
import { useCallback, useMemo } from 'react';

interface Props {
    loginHandle: () => void;
}
// 该组件用于显示用户的头像，如果用户没有登录，那么就显示登录注册按钮
function LoginAvatar(props: Props) {
    const { isLogin, userInfo } = useSelector(
        (state: { user: { isLogin: boolean; userInfo } }) => state.user
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const listClickHandle = useCallback((item) => {
        if (item === '个人中心') {
            // 跳转到个人中心
        } else {
            // 退出登录
            // 清除 token
            localStorage.removeItem('userToken');
            // 清除状态仓库
            dispatch(clearUserInfo());
            dispatch(changeLoginStatus(false));
            navigate('/');
        }
    }, [dispatch, navigate]);

    const loginStatus = useMemo(() => {
        if (isLogin) {
            // 登录了的
            const content = (
                <List
                    dataSource={['个人中心', '退出登录']}
                    size="large"
                    renderItem={(item) => {
                        return (
                            <List.Item
                                style={{ cursor: 'pointer' }}
                                onClick={() => listClickHandle(item)}
                            >
                                {item}
                            </List.Item>
                        );
                    }}
                />
            );
            return (
                <Popover content={content} trigger="hover" placement="bottom">
                    <div className={styles.avatarContainer}>
                        <Avatar
                            src={<Image src={userInfo?.avatar} preview={false} />}
                            size="large"
                            icon={<UserOutlined />}
                        />
                    </div>
                </Popover>
            );
        } else {
            // 没有登录
            return (
                <Button type="primary" size="large" onClick={props.loginHandle}>
                    注册/登录
                </Button>
            );
        }
    }, [isLogin, listClickHandle, userInfo?.avatar, props.loginHandle]);

    return <div>{loginStatus}</div>;
}

export default LoginAvatar;

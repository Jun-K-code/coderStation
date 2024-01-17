import { useState, useEffect } from 'react';
import { Layout, message } from 'antd';
import { useDispatch } from 'react-redux';

import { NavHeader } from './components/NavHeader';
import { PageFooter } from './components/PageFooter';
import LoginForm from './components/LoginForm';
import RouteConfig from './router';
import { getInfo, getUserById } from './api/user';
import { initUserInfo, changeLoginStatus } from './redux/userSlice';

import './css/App.css';

const { Header, Footer, Content } = Layout;
const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    // 加载根组件的时候，需要恢复用户的登录状态
    useEffect(() => {
        const fetchData = async () => {
            const result: any = await getInfo();
            if (result.data) {
                // 说明 token 有效
                // 获取该 id 对应的用户信息，存储到状态仓库
                const { data } = await getUserById(result.data._id);
                // 存储到状态仓库
                dispatch(initUserInfo(data));
                dispatch(changeLoginStatus(true));
            } else {
                // 说明 token 过期了
                message.warning(result.msg);
                localStorage.removeItem('userToken');
            }
        };
        if (localStorage.getItem('userToken')) {
            fetchData();
        }
    }, []);

    // 打开弹框
    const loginHandle = () => setIsModalOpen(true);

    // 关闭弹框
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="App">
            {/* 头部 */}
            <Header className="header">
                <NavHeader loginHandle={loginHandle} />
            </Header>
            {/* 匹配上的路由页面 */}
            <Content className="content">
                <RouteConfig />
            </Content>
            {/* 底部 */}
            <Footer className="footer">
                <PageFooter />
            </Footer>
            {/* 登录弹窗 */}
            <LoginForm isShow={isModalOpen} closeModal={closeModal} />
        </div>
    );
};
export default App;

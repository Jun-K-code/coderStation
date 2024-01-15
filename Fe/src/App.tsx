import { useState } from 'react';
import { Layout } from 'antd';

import { NavHeader } from './components/NavHeader';
import { PageFooter } from './components/PageFooter';
import LoginForm from './components/LoginForm';
import RouteConfig from './router';

import './css/App.css';

const { Header, Footer, Content } = Layout;
const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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

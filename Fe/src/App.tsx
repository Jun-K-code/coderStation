import React from 'react';
import { Layout } from 'antd';

import { NavHeader } from './components/NavHeader';
import { PageFooter } from './components/PageFooter';
import RouteConfig from './router';

import './css/App.css';

const { Header, Footer, Content } = Layout;
const App: React.FC = () => (
    <div className="App">
        {/* 头部 */}
        <Header className="header">
            <NavHeader />
        </Header>
        {/* 匹配上的路由页面 */}
        <Content className='content'>
            <RouteConfig />
        </Content>
        {/* 底部 */}
        <Footer className="footer">
            <PageFooter />
        </Footer>
    </div>
);
export default App;

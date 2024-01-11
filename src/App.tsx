import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => (
    <div>
        <Pagination defaultCurrent={6} total={500} />
    </div>
);
export default App;

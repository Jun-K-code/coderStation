import { Route, Routes, Navigate } from 'react-router-dom';

import Issues from '../pages/Issues';
import Books from '../pages/Books';
import Interviews from '../pages/Interviews';
import AddIssue from '../pages/AddIssue';

const RouteConfig = () => {
    return (
        <Routes>
            <Route path="/issues" element={<Issues />} />
            <Route path="/books" element={<Books />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/addIssue" element={<AddIssue />} />
            <Route path="/" element={<Navigate to='/issues' replace />} />
        </Routes>
    );
};
export default RouteConfig;

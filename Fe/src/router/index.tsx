import { Route, Routes, Navigate } from 'react-router-dom';

import Issues from '../pages/Issues';
import IssueDetail from "../pages/IssueDetail";
import Books from '../pages/Books';
import AddIssue from '../pages/AddIssue';
import SearchPage from "../pages/SearchPage";

const RouteConfig = () => {
    return (
        <Routes>
            <Route path="/issues" element={<Issues />} />
            <Route path="/issues/:id" element={<IssueDetail />} />
            <Route path="/books" element={<Books />} />
            <Route path="/addIssue" element={<AddIssue />} />
            <Route path="/searchPage" element={<SearchPage />} />
            <Route path="/" element={<Navigate to='/issues' replace />} />
        </Routes>
    );
};
export default RouteConfig;

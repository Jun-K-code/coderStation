import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

import PageHeader from '../components/PageHeader';
import IssueItem from '../components/IssueItem';
import AddIssueBtn from '../components/AddIssueBtn';
import Recommend from "../components/Recommend";
import ScoreRank from '../components/ScoreRank';
import { getIssueByPage } from '../api/issue';
import { getTypeList } from '../redux/typeSlice.js';

import styles from '../css/Issue.module.css';

const Issues = () => {
    const dispatch = useDispatch();
    const { typeList } = useSelector((state) => state.type);
    const [issueInfo, setIssueInfo] = useState([]); // 用于存储获取到的状态列表
    // 分页信息
    const [pageInfo, setPageInfo] = useState({
        current: 1, // 当前是第一页
        pageSize: 15, // 每一页显示 15 条数据
        total: 0, // 数据的总条数
    });

    useEffect(() => {
        if (!typeList.length) {
            // 派发 action 来发送请求，获取到数据填充到状态仓库
            dispatch(getTypeList());
        }
    }, []);

    useEffect(() => {
        async function fetchData() {
            // {currentPage: 1, eachPage: 15, count: 21, totalPage: 2, data: Array(15)}
            const { data } = await getIssueByPage({
                current: pageInfo.current,
                pageSize: pageInfo.pageSize,
                issueStatus: true,
            });
            setIssueInfo(data.data);
            setPageInfo({
                current: data.currentPage,
                pageSize: data.eachPage,
                total: data.count,
            });
        }
        fetchData();
    }, [pageInfo.current, pageInfo.pageSize]);

    const issueList = useMemo(() => {
        return issueInfo?.map((item, i) => (
            <IssueItem key={i} issueInfo={issueInfo[i]} typeList={typeList} />
        ));
    }, [issueInfo]);

    // 处理翻译的回调函数
    const handlePageChange = (current, pageSize) => {
        setPageInfo({
            current,
            pageSize,
        });
    };

    return (
        <div className={styles.container}>
            {/* 上面的头部 */}
            <PageHeader title="问答列表" />
            {/* 下面的列表内容区域 */}
            <div className={styles.issueContainer}>
                {/* 左边区域 */}
                <div className={styles.leftSide}>
                    {issueList}
                    <div className="paginationContainer">
                        <Pagination
                            showQuickJumper
                            defaultCurrent={1}
                            {...pageInfo}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
                {/* 右边区域 */}
                <div className={styles.rightSide}>
                    {/* 我要发问按钮 */}
                    <AddIssueBtn />
                    {/* 推荐内容 */}
                    <div style={{ marginBottom: '30px' }}>
                        <Recommend />
                    </div>
                    {/* 积分排名 */}
                    <ScoreRank/>
                </div>
            </div>
        </div>
    );
};
export default Issues;

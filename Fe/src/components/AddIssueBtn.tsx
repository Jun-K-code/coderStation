/**
 * @description 添加问答
 */
import { Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddIssue = () => {
    const { isLogin } = useSelector((state: any) => state.user);
    const navigate = useNavigate();

    const clickHandle = () => {
        // 要做的事情就是跳转到添加问答页面
        // 但是要做一个是否登录的判断
        if (isLogin) {
            // 跳转
            navigate('/addIssue');
        } else {
            message.warning('请先登录');
        }
    }

    return (
        <Button
            type="primary"
            size="large"
            style={{
                width: '100%',
                marginBottom: '30px',
            }}
            onClick={clickHandle}
        >
            我要发问
        </Button>
    );
}
export default AddIssue;

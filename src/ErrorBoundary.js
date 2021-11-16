import * as React from 'react';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 你同样可以将错误日志上报给服务器
        //   logErrorToMyService(error, errorInfo);
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (<>
                <Alert severity="error">
                    <AlertTitle>内存炸了</AlertTitle>
                    <strong>尝试刷新页面!</strong>如果再次上传不行，就上传小一点的图片吧！
                </Alert>
                {this.props.children}
            </>);
        }

        return this.props.children;
    }
}
export default ErrorBoundary
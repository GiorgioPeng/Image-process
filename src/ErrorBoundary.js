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
                    （内存调度过来可能仍然能继续运行）如果下面处理结果没有显示<strong>尝试刷新页面!</strong>并再次上传|<strong>或者上传小一点的图片吧！</strong>
                </Alert>
                {this.props.children}
            </>);
        }

        return this.props.children;
    }
}
export default ErrorBoundary
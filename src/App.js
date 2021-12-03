import './App.css';
import { GlobalStateProvider } from "./globalState";
import { Divider } from "@material-ui/core/";
import Uploader from './Uploader'
import Channels from './Canvases/Channels';
import Gradient from './Canvases/Gradient';
import RobortGradient from './Canvases/RobortGradient';
import Fourier from './Canvases/Fourier';
import HistSegment from './Canvases/HistSegment';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <GlobalStateProvider>
      <ErrorBoundary>
        <Uploader />
        <Divider />
        <Channels />
        <Divider />
        <Gradient />
        <Divider />
        <RobortGradient />
        <Divider />
        {/* <Fourier /> */}
        <HistSegment/>
      </ErrorBoundary>
    </GlobalStateProvider>
  );
}

export default App;

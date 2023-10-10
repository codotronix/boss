import Dock from './components/layout/dock/Dock';
import AppsContainer from './components/system/appsContainer/AppsContainer';
// import { WinFrame } from './components/common';
// import { WelcomeApp } from './components/applications';

const App = () => {

  return (
    <div className="App">

      {/* <WelcomeApp /> */}

      {/* <WinFrame /> */}
      <AppsContainer />
      <Dock />
    </div>
  );
}

export default App;

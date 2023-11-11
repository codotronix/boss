import Dock from './components/system/dock/Dock';
import AppsContainer from './components/system/appsContainer/AppsContainer';

const App = () => {

  return (
    <div className="App">

      {/* <Suspense fallback="Loading ...">
        <BCalc />
      </Suspense> */}

      {/* <WelcomeApp /> */}

      {/* <WinFrame /> */}
      <AppsContainer />
      <Dock />
    </div>
  );
}

export default App;

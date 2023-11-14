import Dock from './components/system/dock/Dock';
import AppsContainer from './components/system/appsContainer/AppsContainer';

const App = () => {

  return (
    <div className="App">
      <AppsContainer />
      <Dock />
    </div>
  );
}

export default App;

import Dock from './components/system/dock/Dock';
import AppsContainer from './components/system/appsContainer/AppsContainer';
import { useSelector } from 'react-redux';
import './App.css';

const App = () => {
  const settings = useSelector(state => state.settings)

  const getStyles = () => ({
    backgroundImage: `url(${settings.wallpaper})`,
  })

  return (
    <div className="App" style={getStyles()}>
      <AppsContainer />
      <Dock />
    </div>
  );
}

export default App;

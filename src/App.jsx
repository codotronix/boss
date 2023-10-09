import { useState, useEffect } from 'react';
import './App.css';
import Dock from './components/layout/dock/Dock';
import { getDockConfig } from './services/config';
import { WinFrame } from './components/common';

const App = () => {
  const [dockDetails, setDockDetails] = useState({})
  // const dockDetails = await getDockConfig()

  useEffect(() => {
    async function fetchDockDetails() {
      const _dockDetails = await getDockConfig()
      // console.log('here =', _dockDetails)
      setDockDetails(_dockDetails)
    }
    fetchDockDetails()
  }, 
  [])

  return (
    <div className="App">

      <WinFrame />

      <Dock dockDetails={dockDetails} />
    </div>
  );
}

export default App;

import Dock from './components/system/dock/Dock';
import AppsContainer from './components/system/appsContainer/AppsContainer';
// import { WinFrame } from './components/common';
// import { WelcomeApp } from './components/applications';
// import React, { Suspense } from 'react';
// const BCalc = React.lazy(() => import('bcalc/BCalc'))

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

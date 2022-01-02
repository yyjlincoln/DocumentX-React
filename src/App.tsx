import React, { useState } from 'react';
import { Outlet } from 'react-router';
import './App.css';
import { UserContext } from './common';


function App() {
  const [userState, setUserState] = useState<{} | null>(null)
  return (
    <div className="App">
      <UserContext.Provider value={{ userState, setUserState }}>
        <Outlet />
      </UserContext.Provider>
    </div>
  );
}

export default App;

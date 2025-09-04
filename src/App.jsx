import React from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';

const App = () => {
  return (
    <div className="flex flex-col bg-[#0C1522]">
      <NavBar />
      <main className="mt-15">
        <Home />
      </main>
    </div>
  );
};

export default App;

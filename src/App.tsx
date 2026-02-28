import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BaseTemplate from './templates/BaseTemplate/BaseTemplate';
import Dashboard from './pages/Dashboard';
import NetworkTraffic from './pages/NetworkTraffic';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <BaseTemplate>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/NetworkTraffic" element={<NetworkTraffic />} />
          <Route path="/events" element={<div>Security Events Page</div>} />
          <Route path="/alerts" element={<div>Alerts Page</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
        </Routes>
      </BaseTemplate>
    </BrowserRouter>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import EmergencyRequest from './pages/EmergencyRequest';
import DispatchCenter from './pages/DispatchCenter';
import HospitalPrep from './pages/HospitalPrep';
import PatientMonitor from './pages/PatientMonitor';
import StaffAssignment from './pages/StaffAssignment';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main className="main-content glass-panel" style={{ margin: '16px 16px 16px 276px', borderRadius: '24px', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<EmergencyRequest />} />
            <Route path="/dispatch" element={<DispatchCenter />} />
            <Route path="/preparation" element={<HospitalPrep />} />
            <Route path="/patient/:id" element={<PatientMonitor />} />
            <Route path="/staff" element={<StaffAssignment />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

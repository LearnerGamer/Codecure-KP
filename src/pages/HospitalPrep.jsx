import React from 'react';
import { Activity, Clock, Users, ArrowRight, BellRing, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HospitalPrep() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Hospital Preparation Dashboard</h1>
          <p className="text-muted mt-2">Staff alerting and trauma bay preparation tracking</p>
        </div>
        <div className="flex gap-2 items-center">
            <span className="badge badge-warning">Incoming Emergency</span>
            <div className="live-indicator"></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="card glass-panel" style={{ borderTop: '4px solid var(--warning)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-title text-warning"><Clock size={20} /> ETA</h3>
            <span className="text-2xl font-bold">12m</span>
          </div>
          <p className="text-muted text-sm">Ambulance MED-9942 currently on I-405 S.</p>
        </div>
        <div className="card glass-panel" style={{ borderTop: '4px solid var(--danger)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-title text-danger"><Activity size={20} /> Current State</h3>
            <span className="badge badge-danger">CRITICAL</span>
          </div>
          <p className="text-muted text-sm">Patient stabilized but HR elevated (124 bpm).</p>
        </div>
        <div className="card glass-panel" style={{ borderTop: '4px solid var(--primary)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-title text-primary"><Users size={20} /> Response Team</h3>
            <span className="font-bold">4 Assigned</span>
          </div>
          <p className="text-muted text-sm">Dr. Roberts (Trauma) & 3 Nurses waiting in Bay 3.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card glass-panel">
          <div className="card-header border-b pb-4" style={{ borderColor: 'var(--panel-border)' }}>
            <h3 className="card-title"><ClipboardList size={20} /> Pre-Arrival Checklist</h3>
            <span className="text-sm text-primary font-bold">75% Ready</span>
          </div>
          <div className="flex-col gap-4 mt-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked readOnly className="w-5 h-5 rounded border-gray-300 text-primary" style={{ accentColor: 'var(--success)' }} />
              <span className="text-muted" style={{ textDecoration: 'line-through' }}>Clear Trauma Bay 3</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked readOnly className="w-5 h-5 rounded border-gray-300" style={{ accentColor: 'var(--success)' }} />
              <span className="text-muted" style={{ textDecoration: 'line-through' }}>Alert On-Call Surgeon</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked readOnly className="w-5 h-5 rounded border-gray-300" style={{ accentColor: 'var(--success)' }} />
              <span className="text-muted" style={{ textDecoration: 'line-through' }}>Prepare O-Negative Blood</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded" />
              <span>Setup Defibrillator & Vitals Monitor</span>
            </label>
          </div>
        </div>

        <div className="card glass-panel flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(0,0,0,0.5))' }}>
           <div>
               <div className="flex items-center gap-2 mb-4">
                   <div className="p-2 rounded-full" style={{ background: 'var(--success)', color: 'white' }}>
                       <BellRing size={24} />
                   </div>
                   <h3 className="card-title text-success" style={{ fontSize: '1.4rem' }}>Final Admission Flow</h3>
               </div>
               <p className="text-muted">
                   Once the patient arrives, quickly tap to trigger the admission flow. The system will sync the ambulance's live vitals to the hospital bed monitor instantly.
               </p>
           </div>
           
           <button 
             onClick={() => navigate('/patient/123')} 
             className="btn btn-success mt-8" 
             style={{ padding: '20px', fontSize: '1.2rem', background: 'var(--success)', color: 'white', border: 'none', borderRadius: '12px' }}
           >
             Confirm Arrival & Sync Data <ArrowRight size={20} className="ml-2" />
           </button>
        </div>
      </div>
    </div>
  );
}

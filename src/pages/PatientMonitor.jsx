import React, { useState, useEffect } from 'react';
import { Activity, HeartPulse, Droplet, Wind, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function PatientMonitor() {
  const [vitals, setVitals] = useState({
    hr: 110,
    bpSys: 140,
    bpDia: 90,
    spo2: 94
  });

  const [severity, setSeverity] = useState('moderate'); // mild, moderate, critical

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => {
        const newHr = prev.hr + Math.floor(Math.random() * 5) - 2;
        const newSpo2 = prev.spo2 + Math.floor(Math.random() * 3) - 1;
        
        let newSeverity = 'mild';
        if (newHr > 120 || newSpo2 < 90) newSeverity = 'critical';
        else if (newHr > 100 || newSpo2 < 95) newSeverity = 'moderate';
        
        setSeverity(newSeverity);
        
        return {
          hr: newHr > 180 ? 180 : newHr < 40 ? 40 : newHr,
          bpSys: prev.bpSys + Math.floor(Math.random() * 4) - 2,
          bpDia: prev.bpDia + Math.floor(Math.random() * 4) - 2,
          spo2: newSpo2 > 100 ? 100 : newSpo2 < 70 ? 70 : newSpo2
        };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityStyles = () => {
    switch(severity) {
      case 'critical': return { color: 'var(--danger)', bg: 'rgba(239, 68, 68, 0.1)' };
      case 'moderate': return { color: 'var(--warning)', bg: 'rgba(245, 158, 11, 0.1)' };
      case 'mild': return { color: 'var(--success)', bg: 'rgba(16, 185, 129, 0.1)' };
      default: return { color: 'white', bg: 'transparent' };
    }
  };

  const severityStyle = getSeverityStyles();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-3">
            John Doe (ID: 99x-A2) 
            <span className={`badge badge-${severity === 'critical' ? 'danger' : severity === 'moderate' ? 'warning' : 'success'}`} style={{ fontSize: '0.8rem' }}>
               {severity.toUpperCase()} CONDITION
            </span>
          </h1>
          <p className="text-muted mt-2">Live Monitoring & AI Medical Summarization synced from Bay 3</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="card glass-panel" style={{ borderTop: '4px solid var(--danger)', padding: '24px' }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted"><HeartPulse size={24} color="var(--danger)" /></span>
            <span className="text-danger font-bold text-2xl">{vitals.hr}</span>
          </div>
          <h3 className="text-sm font-bold text-muted uppercase tracking-wider">Heart Rate</h3>
          <div className="mt-4 h-12 flex items-center">
             <div className="w-full flex justify-between items-end gap-1">
                 {[40, 60, 50, 80, 110, 105, 95, 115, vitals.hr].map((val, i) => (
                    <div key={i} style={{ width: '10%', backgroundColor: 'var(--danger)', height: `${(val / 150) * 100}%`, borderRadius: '4px', opacity: i === 8 ? 1 : 0.4, transition: 'height 0.3s' }}></div>
                 ))}
             </div>
          </div>
        </div>

        <div className="card glass-panel" style={{ borderTop: '4px solid var(--primary)', padding: '24px' }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted"><Wind size={24} color="var(--primary)" /></span>
            <span className="text-primary font-bold text-2xl">{vitals.spo2}%</span>
          </div>
          <h3 className="text-sm font-bold text-muted uppercase tracking-wider">SpO2 Level</h3>
           <div className="mt-4 bg-gray-800 rounded-full h-2 w-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
               <div style={{ width: `${vitals.spo2}%`, background: 'var(--primary)', height: '100%', borderRadius: '10px', transition: 'width 0.5s' }}></div>
           </div>
        </div>

        <div className="card glass-panel" style={{ borderTop: '4px solid var(--secondary)', padding: '24px' }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted"><Droplet size={24} color="var(--secondary)" /></span>
            <span className="text-secondary font-bold text-2xl">{vitals.bpSys}/{vitals.bpDia}</span>
          </div>
          <h3 className="text-sm font-bold text-muted uppercase tracking-wider">Blood Pressure</h3>
          <div className="text-xs text-muted mt-2 border-t pt-2" style={{ borderColor: 'var(--panel-border)' }}>Normal Range: ~120/80 mmHg</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card glass-panel">
          <div className="card-header border-b pb-4" style={{ borderColor: 'var(--panel-border)' }}>
            <h3 className="card-title text-secondary"><FileText size={20} /> Pre-Fetched Medical History</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
             <div className="p-4 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <h4 className="text-muted text-xs uppercase font-bold mb-2">Known Allergies</h4>
                <div className="flex flex-wrap gap-2">
                   <span className="badge badge-danger">Penicillin</span>
                   <span className="badge badge-warning">Peanuts</span>
                </div>
             </div>
             <div className="p-4 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <h4 className="text-muted text-xs uppercase font-bold mb-2">Past Diseases</h4>
                <div className="text-sm">Asthma (Diagnosed 2015), Type 2 Diabetes</div>
             </div>
             <div className="p-4 rounded-lg col-span-2" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <h4 className="text-muted text-xs uppercase font-bold mb-2">Active Medications</h4>
                <div className="text-sm">Metformin 500mg (Daily), Albuterol Inhaler (As needed)</div>
             </div>
          </div>
        </div>

        <div className="card glass-panel" style={{ background: severityStyle.bg, border: `1px solid ${severityStyle.color}40` }}>
          <div className="card-header border-b pb-4" style={{ borderColor: `${severityStyle.color}40` }}>
            <h3 className="card-title" style={{ color: severityStyle.color }}>
              <AlertTriangle size={20} /> AI Severity Prediction
            </h3>
          </div>
          <div className="mt-4 flex flex-col items-center justify-center p-6 text-center">
             <div className="mb-4">
                <ShieldCheck size={48} color={severityStyle.color} />
             </div>
             <h2 className="text-2xl font-bold mb-2" style={{ color: severityStyle.color, textTransform: 'uppercase' }}>
                {severity} State Detected
             </h2>
             <p className="text-muted text-sm px-6">
                {severity === 'critical' 
                  ? 'AI Analysis suggests immediate intervention. High risk of cardiac anomalies based on elevated HR and falling SpO2.' 
                  : severity === 'moderate' 
                    ? 'Patient requires continuous monitoring. Vitals are fluctuating but stable within secondary thresholds.'
                    : 'Vitals are stabilizing. Proceed with standard trauma assessment protocols.'}
             </p>
             <div className="mt-6 w-full text-left bg-black bg-opacity-30 p-4 rounded-lg text-sm border-l-4" style={{ borderColor: severityStyle.color }}>
                <strong>AI Recommendation:</strong> {severity === 'critical' ? 'Prepare adrenaline and clear airway path instantly.' : 'Review patient history and administer fluids.'}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

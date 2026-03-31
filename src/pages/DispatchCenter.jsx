import React, { useState, useEffect } from 'react';
import { Ambulance, Map, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DispatchCenter() {
  const [assigning, setAssigning] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAssigning(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Smart Dispatch Center</h1>
          <p className="text-muted mt-2">AI-driven routing for nearest resources</p>
        </div>
      </div>

      {assigning ? (
        <div className="flex flex-col items-center justify-center my-12 py-12 glass-panel">
          <div className="live-indicator mb-6" style={{ width: '24px', height: '24px', backgroundColor: 'var(--primary)', boxShadow: '0 0 20px var(--primary)' }}></div>
          <h2 className="text-xl font-bold mb-2">Analyzing Geographic Data...</h2>
          <p className="text-muted">Calculating optimal routes and querying hospital availability</p>
        </div>
      ) : (
        <div className="grid grid-cols-1" style={{ gap: '24px' }}>
          <div className="grid grid-cols-2 gap-6">
            <div className="card glass-panel" style={{ borderLeft: '4px solid var(--primary)' }}>
              <div className="card-header">
                <h3 className="card-title text-primary"><Ambulance size={20} /> Dispatched Unit</h3>
                <span className="badge badge-success">En Route</span>
              </div>
              <div className="flex-col gap-4 mt-2">
                <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: 'var(--panel-border)' }}>
                  <span className="text-muted">Vehicle ID</span>
                  <span className="font-bold">MED-9942</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: 'var(--panel-border)' }}>
                  <span className="text-muted">Paramedic Lead</span>
                  <span className="font-bold">Sarah Jenkins</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-muted">Estimated Time of Arrival</span>
                  <span className="font-bold text-warning" style={{ fontSize: '1.2rem' }}>4 Mins</span>
                </div>
              </div>
            </div>

            <div className="card glass-panel" style={{ borderLeft: '4px solid var(--secondary)' }}>
              <div className="card-header">
                <h3 className="card-title text-secondary"><Building2 size={20} /> Destination Hospital</h3>
                <span className="badge badge-primary">Alerted</span>
              </div>
              <div className="flex-col gap-4 mt-2">
                <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: 'var(--panel-border)' }}>
                  <span className="text-muted">Facility</span>
                  <span className="font-bold">City Central Medical</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: 'var(--panel-border)' }}>
                  <span className="text-muted">Department</span>
                  <span className="font-bold text-danger">Trauma ER - Bay 3</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-muted">Distance</span>
                  <span className="font-bold">2.4 Miles</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card glass-panel p-0" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="bg-gray-800 flex items-center justify-center relative" style={{ height: '300px', background: 'radial-gradient(circle at center, rgba(30,58,138,0.5) 0%, #0b1121 100%)' }}>
              {/* Simulated Map Display */}
              <div style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                 <MapPin color="var(--danger)" size={32} />
                 <div className="text-xs text-danger font-bold mt-1">Patient</div>
              </div>
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: '150px', height: '2px', background: 'var(--primary)', borderStyle: 'dashed', animation: 'dash 20s linear infinite' }}></div>
              <div style={{ position: 'absolute', top: '50%', left: '70%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                 <Building2 color="var(--success)" size={32} />
                 <div className="text-xs text-success font-bold mt-1">Hospital</div>
              </div>
              <div style={{ position: 'absolute', top: '48%', left: '40%', animation: 'moveAmbulance 5s linear infinite' }}>
                <div style={{ padding: '8px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 15px var(--primary)' }}>
                  <Ambulance color="white" size={20} />
                </div>
              </div>
              <style>{`
                @keyframes moveAmbulance {
                  0% { left: 30%; top: 48%; }
                  100% { left: 70%; top: 48%; }
                }
              `}</style>
              <div style={{ position: 'absolute', top: '16px', left: '16px' }} className="badge badge-success">
                <div className="live-indicator mr-2" style={{ backgroundColor: 'var(--success)', display: 'inline-block' }}></div> Live GPS Tracking
              </div>
            </div>
            <div className="p-4 flex justify-between items-center border-t" style={{ borderColor: 'var(--panel-border)' }}>
              <div>
                <div className="font-bold flex items-center gap-2"><CheckCircle2 size={16} color="var(--success)" /> Routing Successful</div>
                <div className="text-sm text-muted">Ambulance arriving at scene shortly.</div>
              </div>
              <button onClick={() => navigate('/preparation')} className="btn btn-primary">
                View Hospital Preparation <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

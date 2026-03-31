import React, { useState } from 'react';
import { ShieldAlert, MapPin, User, Hash, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmergencyRequest() {
  const [formData, setFormData] = useState({ name: '', id: '' });
  const [location, setLocation] = useState('Detecting...');
  const navigate = useNavigate();

  const handleDetect = () => {
    setLocation('Detecting GPS Co-ordinates...');
    setTimeout(() => {
      setLocation('34.0522° N, 118.2437° W (Los Angeles, CA)');
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.id) {
      navigate('/dispatch');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Emergency Request Protocol</h1>
          <p className="text-muted mt-2">Initialize rapid response system for critical patients</p>
        </div>
        <div className="badge badge-danger">
          <div className="live-indicator" style={{ backgroundColor: 'currentColor' }}></div>
          Emergency System Online
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="card glass-panel" style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <div className="flex items-center gap-2 mb-6">
            <div style={{ padding: '12px', background: 'rgba(239,68,68,0.2)', borderRadius: '12px' }}>
              <ShieldAlert size={32} color="var(--danger)" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-danger" style={{ color: 'var(--danger)' }}>Trigger Emergency Response</h2>
              <div className="text-sm text-muted">Immediate action required</div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label flex items-center gap-2"><User size={16} /> Patient Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Enter full name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label flex items-center gap-2"><Hash size={16} /> Unique Verification ID</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="SSN / National ID" 
                value={formData.id}
                onChange={(e) => setFormData({...formData, id: e.target.value})}
                required
              />
            </div>
            
            <div className="input-group">
              <label className="input-label flex items-center justify-between">
                <span className="flex items-center gap-2"><MapPin size={16} /> Exact Location</span>
                <button type="button" onClick={handleDetect} className="text-primary text-sm flex items-center gap-1 font-bold" style={{ background: 'transparent' }}>
                  <Navigation size={14} /> Auto-Detect
                </button>
              </label>
              <div className="input-field flex items-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                {location}
              </div>
            </div>

            <button type="submit" className="btn btn-danger w-full mt-4" style={{ padding: '16px', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <ShieldAlert size={20} /> Deploy Ambulance & Medical Team
            </button>
          </form>
        </div>
        
        <div className="flex-col gap-6 flex">
          <div className="card glass-panel flex-1" style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80") center/cover opacity-30', opacity: 0.15 }}></div>
            <div style={{ padding: '24px', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
               <h3 className="card-title mb-4">AI Predictive Protocol</h3>
               <div className="text-muted text-sm flex-1">
                 Our system instantly cross-references the User ID with global medical databases to pre-fetch medical history, prepare hospital staff before arrival, and assign the nearest smart ambulance based on live traffic data.
               </div>
               
               <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
                    <div className="text-2xl font-bold text-primary">2.4m</div>
                    <div className="text-xs text-muted text-uppercase">Avg Dispatch Time</div>
                  </div>
                  <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
                    <div className="text-2xl font-bold text-success">98%</div>
                    <div className="text-xs text-muted text-uppercase">Survival Rate Improve</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
